import { and, asc, count, desc, eq, getTableColumns, gte, like, lte, max } from 'drizzle-orm';
import { cache } from 'react';
import { db } from '~/db';
import { usersTable } from '~/db/schema';
import { type FindUsersSchema } from '~/db/users/find';

export type User = typeof usersTable.$inferSelect;
export type Keys = keyof User;
export type Gender = (typeof usersTable.gender.enumValues)[number];
export type Status = (typeof usersTable.status.enumValues)[number];

export const keys = Object.keys(getTableColumns(usersTable)) as Keys[];

/**
 * 유저 MAX ID 조회
 */
export const getMaxId = cache(async () => {
  const row = await db.select({ max: max(usersTable.id) }).from(usersTable);
  return row[0]?.max || 0;
});

/**
 * 유저 목록 조회 (Cache)
 */
export const cachedGetUsers = cache(getUsers);

/**
 * 유저 목록 조회
 */
export async function getUsers({
  offset = 0,
  limit = 50,
  orderBy = 'id',
  sortDirection = 'desc',
  idFrom,
  idTo,
  loginId,
  name,
  email,
  gender,
  birthFrom,
  birthTo,
  contact,
  bio,
  status,
  createdAtFrom,
  createdAtTo,
  updatedAtFrom,
  updatedAtTo,
  createdAtKstFrom,
  createdAtKstTo,
  updatedAtKstFrom,
  updatedAtKstTo,
}: FindUsersSchema) {
  const whereQuery = and(
    idFrom ? gte(usersTable.id, idFrom) : undefined,
    idTo ? lte(usersTable.id, idTo) : undefined,
    loginId ? like(usersTable.loginId, `%${loginId}%`) : undefined,
    name ? like(usersTable.name, `%${name}%`) : undefined,
    email ? like(usersTable.email, `%${email}%`) : undefined,
    gender ? eq(usersTable.gender, gender) : undefined,
    birthFrom ? gte(usersTable.birth, birthFrom) : undefined,
    birthTo ? lte(usersTable.birth, birthTo) : undefined,
    contact ? like(usersTable.contact, `%${contact}%`) : undefined,
    bio ? like(usersTable.bio, `%${bio}%`) : undefined,
    status ? eq(usersTable.status, status) : undefined,
    createdAtFrom ? gte(usersTable.createdAt, createdAtFrom) : undefined,
    createdAtTo ? lte(usersTable.createdAt, createdAtTo) : undefined,
    updatedAtFrom ? gte(usersTable.updatedAt, updatedAtFrom) : undefined,
    updatedAtTo ? lte(usersTable.updatedAt, updatedAtTo) : undefined,
    createdAtKstFrom ? gte(usersTable.createdAt, new Date(createdAtKstFrom).getTime() / 1000) : undefined,
    createdAtKstTo ? lte(usersTable.createdAt, new Date(createdAtKstTo).getTime() / 1000) : undefined,
    updatedAtKstFrom ? gte(usersTable.updatedAt, new Date(updatedAtKstFrom).getTime() / 1000) : undefined,
    updatedAtKstTo ? lte(usersTable.updatedAt, new Date(updatedAtKstTo).getTime() / 1000) : undefined,
  );

  const totalCount =
    (await db.select({ count: count() }).from(usersTable).where(whereQuery).limit(1).get()?.count) ?? 0;

  if (totalCount === 0) {
    return {
      totalCount,
      rows: [],
    };
  }

  const rows = await db
    .select({
      ...getTableColumns(usersTable),
    })
    .from(usersTable)
    .where(whereQuery)
    .orderBy((sortDirection === 'asc' ? asc : desc)(usersTable[orderBy as keyof User]))
    .offset(offset)
    .limit(limit);

  return {
    totalCount,
    rows,
  };
}

/**
 * 유저 조회
 */
export async function getUser(id: number) {
  const row = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return row[0] || null;
}

/**
 * 유저 생성
 */
export async function createUser(user: typeof usersTable.$inferInsert) {
  const row = await db.insert(usersTable).values(user);
  return row.changes;
}

/**
 * 유저 생성
 */
export async function createUsers(users: (typeof usersTable.$inferInsert)[]) {
  const row = await db.insert(usersTable).values(users);
  return row.changes;
}

/**
 * 유저 수정
 */
export async function updateUser(id: number, user: Partial<typeof usersTable.$inferSelect>) {
  const row = await db.update(usersTable).set(user).where(eq(usersTable.id, id));
  return row.changes;
}

/**
 * 유저 삭제
 */
export async function deleteUser(id: number) {
  const row = await db.delete(usersTable).where(eq(usersTable.id, id));
  return row.changes;
}
