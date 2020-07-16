// This module contains error classes, which are used to provide application users
// with accessible notifications.

//For errors that are directed to the developer should use the Error class of Nodejs
const ERR_UNPROCESSABLE_ENTITY = 'err_unprocessable_entity';
const ERR_UNKNOWN = 'err_unknown';

const ERR_NOT_FOUND = 'err_not_found';
const ERR_ALREADY_EXISTS = 'err_already_exists';

const ERR_INVALID_ARG = 'err_invalid_arg'

const ERR_UNAUTHORIZED = 'err_unauthorized';
const ERR_PERMISSION_DENIED = 'err_permission_denied';

class AppError extends Error {
  constructor(code = ERR_UNKNOWN, message = 'Unknown error', details) {
    super(message);
    this.code = code;
    if (details) {
      this.details = details;
    }
  }
}

class UnprocessableEntity extends AppError {
  constructor(message = 'Unprocessable Entity', details) {
    super(ERR_UNPROCESSABLE_ENTITY, message, details);
  }
}

class PermissionDeniedError extends AppError {
  constructor(message = 'Permission denied', details) {
    super(ERR_PERMISSION_DENIED, message, details);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details) {
    super(ERR_UNAUTHORIZED, message, details);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not found', details) {
    super(ERR_NOT_FOUND, message, details);
  }
}

class AlreadyExistsError extends AppError {
  constructor(message = 'Already exists', details) {
    super(ERR_ALREADY_EXISTS, message, details);
  }
}

class InvalidArgError extends AppError {
  /**
   *
   * @param {string} arg
   */
  constructor(arg, message = 'Invalid arguments', details) {
    super(ERR_INVALID_ARG, message, details);
    this.arg = arg;
  }
}

module.exports = {
  AppError,

  UnprocessableEntity,
  NotFoundError,
  AlreadyExistsError,

  InvalidArgError,

  UnauthorizedError,
  PermissionDeniedError,

  ERR_UNPROCESSABLE_ENTITY,
  ERR_UNKNOWN,

  ERR_NOT_FOUND,
  ERR_ALREADY_EXISTS,

  ERR_INVALID_ARG,

  ERR_UNAUTHORIZED,
  ERR_PERMISSION_DENIED,
};
