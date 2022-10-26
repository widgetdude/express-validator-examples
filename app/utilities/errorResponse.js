class ErrorResponse extends Error {
  constructor({ message = 'Server Error', statusCode = 500, meta = {} }) {
    super(message);
    this.statusCode = statusCode;
    this.meta = meta;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;
