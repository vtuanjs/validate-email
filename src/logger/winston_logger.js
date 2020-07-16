const winston = require('winston');
const helper = require('../common/helper');
const LOG_FILE_NAME = `logs/app.log`;

/**
 *
 * @param {object} options
 * @param {string} [options.level]
 * @param {boolean} [options.transportsToConsole]
 * @param {boolean} [options.showLevel]
 * @param {boolean} [options.showTime]
 *
 */
function create(options = {}) {
  options = createOptions(options);
  let loggerOptions = {
    level: options.level,
    format: winston.format.combine(winston.format.printf(createFormatConsole(options))),
    transports: [
      new winston.transports.File({
        filename: LOG_FILE_NAME,
        level: 'info',
        maxsize: 5242880,
        maxFiles: 5,
      }),
    ],
  };
  if (options.transportsToConsole) {
    loggerOptions.transports.push(
      new winston.transports.Console({
        format: winston.format.combine(winston.format.colorize()),
      })
    );
  }
  return winston.createLogger(loggerOptions);
}

function createFormatConsole(options) {
  return function formatConsole(logObject) {
    if (!options.showLevel) {
      logObject = deleteLogLevel(logObject);
    }

    if (options.showTime) {
      logObject = addLogTime(logObject);
    }

    let message = logObject.message;

    if (logObject.level) {
      message = `${logObject.level} ${message}`;
    }

    if (logObject.createdDate) {
      message = `${logObject.createdDate} ${message}`;
    }

    if (logObject.stack) {
      message = `${message}\n${logObject.stack}`;
    }

    return message;
  };
}

function deleteLogLevel(logObject) {
  delete logObject.level;
  return logObject;
}

function addLogTime(logObject) {
  logObject.createdDate = new Date().toISOString();
  return logObject;
}

function createOptions(options = {}) {
  if (!helper.isNotUndefinedOrNull(options)) {
    options = {};
  }

  if (typeof options !== 'object') {
    throw new Error('Invalid type, options is an object');
  }

  if (!helper.isNotUndefinedOrNull(options.level)) {
    options.level = 'info';
  }

  if (!helper.isNotUndefinedOrNull(options.transportsToConsole)) {
    options.transportsToConsole = true;
  }

  if (!helper.isNotUndefinedOrNull(options.showLevel)) {
    options.showLevel = true;
  }

  if (!helper.isNotUndefinedOrNull(options.showTime)) {
    options.showTime = true;
  }
  return options;
}

module.exports = {
  create,
};
