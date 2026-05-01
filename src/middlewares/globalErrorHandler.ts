/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';

interface AppError {
  statusCode?: number;
  message?: string;
  name?: string;
  code?: number;
  keyValue?: Record<string, unknown>;
  stack?: string;
  path?: string;
  value?: unknown;
}

export const globalErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(err);
  const error = err as AppError;

  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  if (error.name === 'ZodError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (error.code === 11000 && error.keyValue) {
    const field = Object.keys(error.keyValue)[0];
    statusCode = 409;
    message = `${field} already exists`;
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = `Invalid value for field: ${error.path}`;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Database Validation Error';
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
