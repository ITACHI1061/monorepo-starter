import { getTableColumns } from 'drizzle-orm';
import { z } from 'zod';
import { usersTable } from '~/db/schema';

export const findUsersSchema = z
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
    email: z.string(), // like
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
  .partial();

export type FindUsersSchema = z.infer<typeof findUsersSchema>;
