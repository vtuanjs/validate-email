/* eslint-disable no-unused-vars */
const router = require('express').Router();
const restfulApiHelper = require('../../common/restful_helper');
const { handleAndSendErrorResponse, createSuccessResponse } = restfulApiHelper;
const errors = require('../../common/errors');
const { AppError, UnprocessableEntity, InvalidArgError } = errors;

function create({ logger, campaignService, appConfig }) {
  router.get('/campaigns/:id/check', async (req, res) => {
    try {
      const count = await campaignService.countProductsSuccess(req.params.id);
      if (count) {
        return res.json(createSuccessResponse(count));
      }
      return handleAndSendErrorResponse(new AppError(), res);
    } catch (error) {
      return handleAndSendErrorResponse(error, res);
    }
  });
  router.get('/campaigns/:id', async (req, res) => {
    try {
      const campaignDoc = await campaignService.getCampaign(req.params.id);
      if (campaignDoc) {
        return res.json(createSuccessResponse(campaignDoc));
      }
      return handleAndSendErrorResponse(new AppError(), res);
    } catch (error) {
      return handleAndSendErrorResponse(error, res);
    }
  });
  router.get('/campaigns', async (req, res) => {
    let { fields, limit, page, sort } = req.query;
    try {
      const campaignsDoc = await campaignService.getCampaigns({
        fields,
        limit,
        page,
        sort,
      });
      if (campaignsDoc) {
        return res.json(createSuccessResponse(campaignsDoc));
      }
      return handleAndSendErrorResponse(new AppError(), res);
    } catch (error) {
      return handleAndSendErrorResponse(error, res);
    }
  });
  return router;
}

module.exports = {
  create,
};
