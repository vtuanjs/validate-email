/* eslint-disable no-unused-vars */
const appConfig = require('config');
const Logger = require('./logger/winston_logger');
const emailValidater = require('./email_validater');

const logger = Logger.create({
  level: appConfig.Logger.Level,
  transportsToConsole: appConfig.Logger.TransportsToConsole,
  showLevel: appConfig.Logger.ShowLevel,
  showTime: appConfig.Logger.ShowTime,
});

process.logger = logger;

function shutdown(option, error, exitCode) {
  process.logger.warn(`Process exit with code: ${exitCode}`);
  process.logger.error(error);

  if (option.exit) {
    process.exit();
  }
}

//do something when app is closing
process.on('exit', shutdown.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', shutdown.bind(null, { exit: true }));

// catches 'kill pid' (for example: nodemon restart)
process.on('SIGUSR1', shutdown.bind(null, { exit: true }));
process.on('SIGUSR2', shutdown.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', shutdown.bind(null, { exit: true }));

const Database = require('./mongodb/mongoose');
Database.create(logger, appConfig.MongoDB.ConnectionString, {
  user: appConfig.MongoDB.User,
  pass: appConfig.MongoDB.Password,
});

const campaignRepository = require('./mongodb/campaign_repository');
const campaignService = require('./service/campaign_service').create({
  campaignRepository,
  emailValidater,
  logger
});

const Application = require('./api/application');
const app = Application.create({
  logger,
  appConfig,
  campaignService
});

function start() {
  app.listen(appConfig.HttpServer.Port);
  logger.info(`Server running or port ${appConfig.HttpServer.Port}`);
}

module.exports = {
  start,
  app,
};
