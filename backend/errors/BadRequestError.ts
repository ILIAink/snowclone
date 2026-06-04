import { StatusCodes } from "http-status-codes";
import { HttpException } from "./HttpException";

export class BadRequestError extends HttpException {
  constructor(message = "Bad Request") {
    super(StatusCodes.BAD_REQUEST, message);
  }
}
