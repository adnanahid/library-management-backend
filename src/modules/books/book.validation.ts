import z from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    title: z
      .string({ error: 'Title is required' })
      .min(2, 'Title must be at least 2 characters')
      .max(50, 'Title must not exceed 50 characters'),
    author: z
      .string({ error: 'Author is required' })
      .min(2, 'Author must be at least 2 characters')
      .max(20, 'Author must not exceed 20 characters'),
    genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'], {
      message: 'Invalid genre',
    }),
    isbn: z
      .string({ error: 'ISBN is required' })
      .min(10, 'ISBN must be at least 10 characters')
      .max(13, 'ISBN must not exceed 13 characters'),
    description: z.string().optional(),
    copies: z
      .number({ error: 'Copies is required' })
      .int('Copies must be a whole number')
      .nonnegative('Copies must be 0 or more'),
    available: z.boolean().default(true),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export type TCreateBook = z.infer<typeof createBookSchema>['body'];
