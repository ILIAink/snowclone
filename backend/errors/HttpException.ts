export class HttpException extends Error {
  public status: number;
  public error: {} | undefined;
  constructor(status: number, message: string, error?: {}) {
    super(message);
    this.status = status;
    this.error = error;
    Error.captureStackTrace(this, this.constructor); // cleaner stack trace
  }
}
