import z from 'zod';

export const createBookSchema = z.object({
  title: z.string().min(2).max(50),
  author: z.string().min(2).max(20),
  genre: z.enum(['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']),
  isbn: z.string().min(10).max(13),
  description: z.string().optional(),
  copies: z.number().int().nonnegative(),
  available: z.boolean().default(true),
});

export type TCreateBook = z.infer<typeof createBookSchema>;
