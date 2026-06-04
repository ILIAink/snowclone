export class ServerError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class RecordNotFoundError extends ServerError {
  constructor(message: string) {
    super(message, "RECORD_NOT_FOUND");
  }
}

export class InvalidInputError extends ServerError {
  constructor(message: string) {
    super(message, "INVALID_INPUT");
  }
}
