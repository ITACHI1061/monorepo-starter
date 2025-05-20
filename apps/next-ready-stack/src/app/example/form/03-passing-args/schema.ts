import { z } from 'zod';

export const schema = z.object({
  textInput1: z.string().min(2, { message: '2글자 이상 입력하시오' }),
  numberInput1: z.coerce.number().min(10, { message: '10 이상 입력하시오' }),
  checkbox1: z.literal('on'),
  radio1: z.enum(['1', '2', '3']),
  nativeSelect1: z.enum(['2', '3', '4']),
  select2: z.enum(['nextjs', 'astro', 'gatsby']),
  slider1: z.coerce.number().min(40, { message: '40 이상 입력하시오' }),
  switch1: z.literal('on'),
});

export type Schema = z.infer<typeof schema>;
export type ErrorType = z.typeToFlattenedError<Schema>['fieldErrors'] | undefined;
