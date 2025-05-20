import { z } from 'zod';

export const languages = [
  { label: 'English', value: 'en' },
  { label: 'French', value: 'fr' },
  { label: 'German', value: 'de' },
  { label: 'Spanish', value: 'es' },
  { label: 'Portuguese', value: 'pt' },
  { label: 'Russian', value: 'ru' },
  { label: 'Japanese', value: 'ja' },
  { label: 'Korean', value: 'ko' },
  { label: 'Chinese', value: 'zh' },
];

export const schema = z.object({
  textInput1: z.string().min(2, { message: '2글자 이상 입력하시오' }).max(10, { message: '10글자 이하로 입력하시오' }),
  checkbox1: z.boolean().refine((data) => data === true, { message: '체크박스를 체크하시오' }),
  dateInput1: z
    .date({
      required_error: '날짜를 입력하시오',
    })
    .optional(),
  radioGroup1: z
    .enum(['all', 'mentions', 'none'], {
      required_error: '알림 유형을 선택하시오.',
    })
    .optional(),
  select1: z
    .string({
      required_error: '이메일을 입력하시오.',
    })
    .email(),
  switch1: z.boolean().refine(Boolean, { message: '스위치를 켜시오' }),
  switch2: z.boolean().default(true).optional(),
  textarea1: z.string().min(10, { message: '10글자 이상 입력하시오' }).optional(),
  combobox1: z
    .enum(languages.map((lang) => lang.value) as [string, ...string[]], {
      required_error: '언어를 선택하시오.',
    })
    .optional(),
  file1: z.array(z.instanceof(File)),
});

export type Schema = z.infer<typeof schema>;
export type ErrorType = z.typeToFlattenedError<Schema>['fieldErrors'] | undefined;
