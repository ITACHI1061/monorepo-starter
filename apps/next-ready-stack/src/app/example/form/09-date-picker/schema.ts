import { z } from 'zod';

export const schema = z.object({
  dateInput: z.string(),
  datePickerSingle: z.string(),
  datePickerMultiple: z.array(z.string()),
  datePickerRange: z.object({
    from: z.string(),
    to: z.string(),
  }),
});

export type Schema = z.infer<typeof schema>;
