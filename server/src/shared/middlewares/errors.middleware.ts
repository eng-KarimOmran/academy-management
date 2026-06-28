import { NextFunction, Request, Response } from "express";
import { IErrorResponse } from "../utils/errorResponse";

const globalErrorHandler = (
  err: IErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "حدث خطأ ما";

  res.status(statusCode).send({
    status: statusCode,
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default globalErrorHandler;
