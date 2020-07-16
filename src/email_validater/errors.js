const {
  AppError,
} = require('../common/errors');

const ERR_VALIDATE_EMAIL_UNKNOWN = 'err_validate_email_unknown';

class ValidateEmailError extends AppError {
  constructor(message = 'Validate Email Unknown error', details) {
    super(undefined, undefined, {
      ...details,
      code: ERR_VALIDATE_EMAIL_UNKNOWN,
      message,
    });
  }
}

module.exports = {
  ValidateEmailError,
  ERR_VALIDATE_EMAIL_UNKNOWN
};
