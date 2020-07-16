const errors = require('./errors');
const { AppError } = errors;

function handleAndSendErrorResponse(e, res) {
  let error = createErrorResponse(e);
  res.status(convertToHttpStatusCode(error.code));
  res.json(error);
}

function convertToHttpStatusCode(code) {
  switch (code) {
    case errors.ERR_INVALID_FORMAT:
    case errors.ERR_INVALID_ARG_TYPE:
    case errors.ERR_INVALID_ARG_VALUE:
    case errors.ERR_INVALID_ARG:
      return 400;
    case errors.ERR_UNAUTHORIZED:
      return 401;
    case errors.ERR_PERMISSION_DENIED:
      return 403;
    case errors.ERR_NOT_FOUND:
      return 404;
    case errors.ERR_ALREADY_EXISTS:
    case errors.ERR_UNPROCESSABLE_ENTITY:
      return 422;
    case errors.ERR_UNKNOWN:
      return 500;
    default:
      return 500;
  }
}

function createErrorResponse(error) {
  if (error instanceof AppError) {
    return {
      code: error.code,
      message: error.message,
      details: error.details,
    };
  } else {
    let unknownError = new AppError();
    return {
      code: unknownError.code,
      message: unknownError.message,
      details: unknownError.details,
    };
  }
}

function createSuccessResponse(data) {
  return data;
}

module.exports = {
  handleAndSendErrorResponse,
  convertToHttpStatusCode,
  createErrorResponse,
  createSuccessResponse,
};
