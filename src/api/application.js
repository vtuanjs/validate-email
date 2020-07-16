/* eslint-disable no-unused-vars */
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const restfulApiHelper = require('../common/restful_helper');
const { handleAndSendErrorResponse } = restfulApiHelper;
const errors = require('../common/errors');
const { AppError, NotFoundError } = errors;

function create({
  logger,
  campaignService,
  appConfig
}) {
  const app = express();
  app.use(cors());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(require('./campaign/create').create({ logger, campaignService, appConfig }));
  app.use(require('./campaign/get').create({ logger, campaignService, appConfig }));
  app.use((req, res, next) => {
    handleAndSendErrorResponse(new NotFoundError('Resources not available'), res);
  });
  app.use((err, req, res, next) => {
    logger.error(err);
    handleAndSendErrorResponse(new AppError(), res);
  });
  return app;
}

module.exports = {
  create,
};
