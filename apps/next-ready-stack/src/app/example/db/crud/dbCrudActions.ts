'use server';

import { faker } from '@faker-js/faker/locale/ko';
import { romanizedSurnames } from '@monorepo-starter/utils/romanized';
import { format } from 'date-fns';
import { revalidateTag } from 'next/cache';
import { usersTable } from '~/db/schema';
import { createUsers, deleteUser, getUser, updateUser } from '~/db/users';

/**
 * Action: 랜덤 유저 생성
 */
export const createRandomUsersAction = async (formData: FormData) => {
  const count = formData.get('count');

  let countNumber = 1;
  if (count !== null) {
    countNumber = parseInt(count as string);
  }

  const users: (typeof usersTable.$inferInsert)[] = [];
  for (let i = 0; i < countNumber; i++) {
    users.push(await createRandomUser());
  }

  await createUsers(users);
  revalidateTag('/example/db/crud');
};

/**
 * Action: 유저 삭제
 */
export const deleteUserAction = async (id: number) => {
  await deleteUser(id);
  revalidateTag('/example/db/crud');
};

/**
 * Action: 유저 수정
 */
export const updateUserAction = async (id: number) => {
  const randomInfo = await createRandomUser();

  await updateUser(id, { bio: randomInfo.bio });
  revalidateTag('/example/db/crud');
};

/**
 * Action: Toggle 유저 상태
 */
export const toggleUserStatusAction = async (id: number) => {
  const user = await getUser(id);
  if (!user) {
    throw new Error('User not found');
  }

  await updateUser(id, { status: user.status === 'active' ? 'inactive' : 'active' });
  revalidateTag('/example/db/crud');
};

/**
 * 랜덤 유저 정보
 */
export async function createRandomUser() {
  const gender = faker.person.sexType();
  const lastName = faker.person.lastName();
  const firstName = faker.person.firstName(gender);
  const romanizedLastName = romanizedSurnames[lastName as keyof typeof romanizedSurnames] ?? undefined;
  const birth = faker.date.birthdate({ min: 16, max: 65, mode: 'age' });

  return {
    loginId: faker.internet.username({ firstName, lastName: romanizedLastName }),
    name: `${lastName}${firstName}`,
    email: faker.internet.email({ lastName: romanizedLastName, allowSpecialCharacters: false }),
    gender,
    birth: format(birth, 'yyyy-MM-dd'),
    contact: `010-${faker.finance.pin(4)}-${faker.finance.pin(4)}`,
    profile: {
      avatar: faker.image.personPortrait({ sex: gender, size: 256 }),
    },
    bio: faker.person.bio(),
  };
}
