import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

export const validateRequest =
  <T>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (result.success) {
      req.body = (result.data as { body: unknown }).body;
      next();
    } else {
      next(result.error);
    }
  };
