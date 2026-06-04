import type { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpException } from "../errors/HttpException";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = error.status
    ? error.status
    : StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    status === 500
      ? "Internal Server Error, Please try again later."
      : error.message;
  // const errors = error.error;

  res.status(status).json({ message, status });
};
