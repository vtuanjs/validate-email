const helper = require('../common/helper');
const { readFileExcel } = require('../excel');

const create = ({ campaignRepository, emailValidater, logger }) => {
  const startCampaign = async (campaignId) => {
    try {
      const campaignDoc = await getCampaign(campaignId);
      let rows = readFileExcel(campaignDoc.excelFilePath);

      if (!rows[0]['EMAIL']) {
        return updateCampaignById(campaignId, {
          status: 'error',
          error: {
            code: 'err_missing_email_field',
          },
        });
      }
      rows = rows.filter((item) => item['EMAIL']);

      await updateCampaignById(campaignId, {
        status: 'processing',
        totalEmail: rows.length,
      });

      while (rows.length > 0) {
        let emails = rows.splice(0, 100).map((item) => item['EMAIL']);
        await helper.waitByPromise(1000);
        handleValidateEmail(campaignId, emails);
      }
    } catch (error) {
      logger.error(error.message);
    }
  };

  const handleValidateEmail = async (campaignId, emails) => {
    try {
      const result = await emailValidater.validateEmails({ emails, delay: 0 });

      const campaignDocs = await updateCampaignById(campaignId, {
        $inc: { totalEmailProcessing: result.length },
        $push: {
          emails: {
            $each: result.map((item) => {
              if (item.validMailbox == null) item.validMailbox = false;
              if (item.validDomain == null) item.validDomain = false;
              return {
                address: item.address,
                validMailbox: item.validMailbox,
                validDomain: item.validDomain,
              };
            }),
          },
        },
      });

      if (campaignDocs.totalEmailProcessing === campaignDocs.totalEmail) {
        return updateCampaignById(campaignId, {
          status: 'success',
        });
      }
    } catch (error) {
      await updateCampaignById(campaignId, {
        status: 'error',
        error,
      });
      logger.error(error.message);
    }
  };

  const updateCampaignById = (id, campaign) => {
    return campaignRepository.updateById(id, campaign);
  };

  const createCampaign = (campaign) => {
    return campaignRepository.insert({
      title: campaign.title,
      excelFileName: campaign.excelFileName,
      excelFilePath: campaign.excelFilePath,
    });
  };

  const getCampaigns = ({ fields, limit, page, sort }) => {
    return campaignRepository.getAll({
      fields,
      limit,
      page,
      sort,
    });
  };

  const getCampaign = (id) => {
    return campaignRepository.getById(id);
  };

  return {
    startCampaign,
    updateCampaignById,
    createCampaign,
    getCampaigns,
    getCampaign,
  };
};

module.exports = { create };
