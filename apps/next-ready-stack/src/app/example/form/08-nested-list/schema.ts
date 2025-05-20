import { z } from 'zod';

export const schema = z.object({
  textInput1: z.string().min(2, { message: '2글자 이상 입력하시오' }).max(10, { message: '10글자 이하로 입력하시오' }),
  items: z
    .array(
      z.object({
        id: z.string().uuid(),
        name: z.string().min(2, { message: '2글자 이상 입력하시오' }).max(10, { message: '10글자 이하로 입력하시오' }),
        age: z.coerce.number().min(1, { message: '1 이상 입력하시오' }).max(100, { message: '100 이하로 입력하시오' }),
        status: z.enum(['active', 'inactive'], { message: 'active 또는 inactive 중 하나를 선택하시오' }),
      }),
    )
    .max(1000, { message: '최대 1000개 까지 등록가능합니다' }),
});

export type Schema = z.infer<typeof schema>;
export type ErrorType = z.typeToFlattenedError<Schema>['fieldErrors'] | undefined;
