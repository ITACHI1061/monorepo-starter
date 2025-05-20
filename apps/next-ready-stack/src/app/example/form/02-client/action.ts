'use server';

import { devLog } from '@monorepo-starter/utils/console';
import { revalidatePath } from 'next/cache';
import { type ErrorType, schema } from './schema';

export async function action(prevState: ErrorType, formData: FormData) {
  const data = Object.fromEntries(formData);
  const isValid = schema.safeParse(data);

  devLog('info', 'data(server action)', data);

  if (!isValid.success) {
    const errorMessages = isValid.error.flatten().fieldErrors;
    return errorMessages;
  }

  devLog('success', 'isValid', isValid);

  revalidatePath('/example/form/02-client');
}
