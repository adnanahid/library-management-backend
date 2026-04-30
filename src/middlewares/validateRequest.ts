import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const parsed = schema.safeParse(req.body);
    if (parsed.success) {
      req.body = parsed.data;
      next();
    } else {
      res.status(400).json({
        success: false,
        message: 'Validation Error',
        errorSources: parsed.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }
  };
};
