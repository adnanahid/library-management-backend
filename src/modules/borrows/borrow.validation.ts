import z from 'zod';

export const borrowBookSchema = z.object({
  body: z.object({
    book: z.string(),
    quantity: z
      .number({ error: 'Copies is required' })
      .int('Copies must be a whole number')
      .nonnegative('Copies must be 0 or more'),
    dueDate: z.string({ error: 'Due date is required' }),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export type TcreateBorrow = z.infer<typeof borrowBookSchema>['body'];
