import type { Response } from 'express';

export function successResponse(
  res: Response,
  data: any,
  statusCode: number,
  message: string
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

export function errorResponse(
  res: Response,
  statusCode: number,
  message: string
) {
  console.error(message);
  return res.status(statusCode).json({
    success: false,
    message,
  });
}
