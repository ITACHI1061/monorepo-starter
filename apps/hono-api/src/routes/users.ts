import { faker } from '@faker-js/faker/locale/ko';
import { zValidator } from '@hono/zod-validator';
import { romanizedSurnames } from '@monorepo-starter/utils/romanized';
import { format } from 'date-fns';
import { and, asc, between, count, desc, eq, getTableColumns, gte, like, lte, sql, SQL } from 'drizzle-orm';
import { Hono } from 'hono';
import { z } from 'zod';
import { db } from '../db/index.js';
import { usersTable, type UsersTable } from '../db/schema.js';

export const users = new Hono()
  /**
   * @method GET
   * @path /users
   * @description 유저 목록 조회
   * @see {@link http://localhost:4000/users?pretty List pretty Print}
   */
  .get(
    '/',
    zValidator(
      'query',
      z
        .object({
          // pagination
          offset: z.coerce.number().default(0),
          limit: z.coerce.number().default(50),
          // sorting
          orderBy: z.enum(Object.keys(getTableColumns(usersTable)) as [string, ...string[]]).default('id'),
          sortDirection: z.enum(['asc', 'desc']).default('desc'),
          // filters
          idFrom: z.coerce.number(), // range start
          idTo: z.coerce.number(), // range end
          loginId: z.string(), // like
          name: z.string(), // like
          email: z.string().email(), // like start
          gender: z.enum(['male', 'female']), // eq
          birthFrom: z.string().date(), // range start
          birthTo: z.string().date(), // range end
          contact: z.string(), // like
          bio: z.string(), // like
          status: z.enum(['active', 'inactive']), // eq enum
          createdAtFrom: z.coerce.number(), // range start(unix epoch) e.g. 1746594475
          createdAtTo: z.coerce.number(), // range end(unix epoch) e.g. 1746594475
          updatedAtFrom: z.coerce.number(), // range start(unix epoch) e.g. 1746594475
          updatedAtTo: z.coerce.number(), // range end(unix epoch) e.g. 1746594475
          createdAtKstFrom: z.string(), // range start(kst) e.g. 2025-05-07%2010:27:55
          createdAtKstTo: z.string(), // range end(kst) e.g. 2025-05-07%2010:27:55
          updatedAtKstFrom: z.string(), // range start(kst) e.g. 2025-05-07%2010:27:55
          updatedAtKstTo: z.string(), // range end(kst) e.g. 2025-05-07%2010:27:55
        })
        .partial()
        .optional(),
    ),
    async (c) => {
      const {
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
      } = c.req.valid('query') ?? {};

      const whereQuery = and(
        idFrom ? gte(usersTable.id, idFrom) : undefined,
        idTo ? lte(usersTable.id, idTo) : undefined,
        loginId ? like(usersTable.loginId, `%${loginId}%`) : undefined,
        name ? like(usersTable.name, `%${name}%`) : undefined,
        email ? like(usersTable.email, `${email}%`) : undefined,
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
        return c.json({
          success: true,
          totalCount,
          rows: [],
        });
      }

      const { createdAt, updatedAt, ...rest } = getTableColumns(usersTable);
      const createdAtKst = sql`datetime(createdAt + 9 * 3600, 'unixepoch')`;
      const updatedAtKst = sql`datetime(updatedAt + 9 * 3600, 'unixepoch')`;

      const rows = await db
        .select({
          ...rest,
          createdAt: createdAtKst,
          updatedAt: updatedAtKst,
        })
        .from(usersTable)
        .where(whereQuery)
        .orderBy((sortDirection === 'asc' ? asc : desc)(usersTable[orderBy as keyof UsersTable]))
        .offset(offset)
        .limit(limit);

      return c.json({
        success: true,
        totalCount,
        rows,
      });
    },
  )

  /**
   * @method POST
   * @path /users/random
   * @description 유저 랜덤 생성
   * @example
   * curl -X POST http://localhost:4000/users/random?count=20 -H "Content-Type: application/json"
   */
  .post(
    '/random',
    zValidator(
      'query',
      z.object({
        count: z.coerce.number().default(1),
      }),
    ),
    async (c) => {
      const { count } = c.req.valid('query');

      const generatedData = Array.from({ length: count }, () => {
        const sex = faker.person.sex() as Exclude<UsersTable['gender'], null>;
        const lastName = faker.person.lastName(sex);
        const firstName = faker.person.firstName(sex);
        const romanizedLastName = romanizedSurnames[lastName as keyof typeof romanizedSurnames] ?? undefined;
        const loginId = faker.internet.username({ lastName: romanizedLastName });
        const birth = faker.date.birthdate({ min: 16, max: 65, mode: 'age' });

        return {
          loginId,
          name: `${lastName}${firstName}`,
          email: faker.internet.email({ lastName: romanizedLastName, allowSpecialCharacters: false }),
          gender: sex,
          birth: format(birth, 'yyyy-MM-dd'),
          contact: `010-${faker.finance.pin(4)}-${faker.finance.pin(4)}`,
          profile: {
            avatar: faker.image.personPortrait({ sex, size: 256 }),
          },
          bio: faker.person.bio(),
        };
      });

      const result = await db.insert(usersTable).values(generatedData);

      return c.json({ result });
    },
  )

  /**
   * @method POST
   * @path /users
   * @description 유저 생성
   * @example
   * curl -X POST http://localhost:4000/users -H "Content-Type: application/json" -d '{"loginId": "john_doe", "name": "John Doe", "email": "john.doe@example.com"}'
   */
  .post(
    '/',
    zValidator(
      'json',
      z
        .object({
          loginId: z.string(),
          name: z.string(),
          email: z.string().email(),
          gender: z.enum(['male', 'female']),
          birth: z.string().date(),
          contact: z.string(),
          profile: z.record(z.string(), z.string()),
          bio: z.string(),
          status: z.enum(['active', 'inactive']),
        })
        .partial({
          gender: true,
          birth: true,
          contact: true,
          profile: true,
          bio: true,
          status: true,
        }),
    ),
    async (c) => {
      const { loginId, name, email } = c.req.valid('json');
      const result = await db.insert(usersTable).values({ loginId, name, email });
      return c.json({ result });
    },
  )
  /**
   * @method PUT
   * @path /users/:id
   * @description 유저 정보 수정
   * @example
   * curl -X PUT http://localhost:4000/users/48 -H "Content-Type: application/json" -d '{"name": "윤석열", "birth": "1960-01-01" }'
   * curl -X PUT http://localhost:4000/users/45 -H "Content-Type: application/json" -d '{"name": "김수현", "birth": "1988-12-01" }'
   * curl -X PUT http://localhost:4000/users/49 -H "Content-Type: application/json" -d '{"name": "고윤정", "birth": "1996-04-22", "gender": "female" }'
   */
  .put(
    '/:id',
    zValidator('param', z.object({ id: z.coerce.number() })),
    zValidator(
      'json',
      z
        .object({
          loginId: z.string(),
          name: z.string(),
          email: z.string().email(),
          gender: z.enum(['male', 'female']),
          birth: z.string().date(),
          contact: z.string(),
          profile: z.record(z.string(), z.string()),
          bio: z.string(),
          status: z.enum(['active', 'inactive']),
        })
        .partial(),
    ),
    async (c) => {
      const { id } = c.req.param();
      const { name, email, birth, status, profile } = await c.req.json();

      const result = await db
        .update(usersTable)
        .set({ name, email, birth, status, profile })
        .where(eq(usersTable.id, Number(id)));
      return c.json({ result });
    },
  )

  /**
   * @method DELETE
   * @path /users
   * @description 유저 전체 삭제
   * @example
   * curl -X DELETE http://localhost:4000/users/all  -H "Content-Type: application/json"
   */
  .delete('/all', async (c) => {
    const result = await db.delete(usersTable);
    return c.json({ result });
  })

  /**
   * @method DELETE
   * @path /users/:id
   * @description 유저 삭제
   * @example
   * curl -X DELETE http://localhost:4000/users/1 -H "Content-Type: application/json"
   */
  .delete('/:id', zValidator('param', z.object({ id: z.coerce.number() })), async (c) => {
    const { id } = c.req.param();
    const result = await db.delete(usersTable).where(eq(usersTable.id, Number(id)));
    return c.json({ result });
  });

export type UsersType = typeof users;
