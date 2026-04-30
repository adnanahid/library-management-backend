import { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';

export const validateRequest =
  <T>(schema: ZodType<T>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    if (result.success) {
      req.body = (result.data as { body: unknown }).body;
      next();
    } else {
      res.status(400).json({
        success: false,
        message: 'Validation Error',
        errorSources: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }
  };