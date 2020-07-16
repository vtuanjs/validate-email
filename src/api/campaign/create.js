/* eslint-disable no-unused-vars */
const router = require('express').Router();
const restfulApiHelper = require('../../common/restful_helper');
const { handleAndSendErrorResponse, createSuccessResponse } = restfulApiHelper;
const errors = require('../../common/errors');
const { AppError, UnprocessableEntity, InvalidArgError } = errors;
const FileUpload = require('../../file_upload');

function create({ logger, campaignService, appConfig }) {
  const { upload } = FileUpload.create({
    fileSizeMB: appConfig.FileUpload.MaxSizeMB,
  });

  router.post('/campaigns', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) throw new UnprocessableEntity('Missing file');
      const campaignDoc = await campaignService.createCampaign({
        title: req.body.title,
        excelFileName: req.file.filename,
        excelFilePath: req.file.path
      });
      if (campaignDoc) {
        campaignService.startCampaign(campaignDoc._id)
        return res.json(createSuccessResponse(campaignDoc));
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
