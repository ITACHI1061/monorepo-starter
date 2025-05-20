'use server';

import { devLog } from '@monorepo-starter/utils/console';
import { revalidatePath } from 'next/cache';
import { schema, type Schema } from './schema';

export async function formTestAction(data: Schema, formData: FormData) {
  const isValid = schema.safeParse(data);

  devLog('info', 'data');
  devLog('info', JSON.stringify(data, null, 2));

  devLog('info', 'isValid');
  devLog('info', JSON.stringify(isValid, null, 2));

  devLog('info', 'formData');
  devLog('info', JSON.stringify(Object.fromEntries(formData), null, 2));

  revalidatePath('/example/form-server-actions/08-nested-list');
}
