const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignSchema = new Schema(
  {
    title: String,
    excelFileName: String,
    excelFilePath: String,
    status: {
      type: String,
      enum: ['created', 'processing', 'error', 'success'],
    },
    totalEmail: Number,
    totalEmailProcessing: {
      type: Number,
      default: 0,
    },
    emails: [
      {
        _id: false,
        address: String,
        validMailbox: Boolean,
        validDomain: Boolean
      },
    ],
    error: {},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CampaignModel = mongoose.model('Campaign', CampaignSchema, 'campaigns');

const updateById = (id, campaign) => {
  return CampaignModel.findOneAndUpdate({ _id: id }, campaign, { new: true });
};

const getAll = async ({ fields, limit = 50, page = 1, sort }) => {
  if (!limit || isNaN(parseInt(limit)) || parseInt(limit) < 1 || parseInt(limit) > 50) {
    limit = 50;
  } else {
    limit = parseInt(limit);
  }

  if (!page || isNaN(parseInt(page)) || parseInt(page) < 1) {
    page = 1;
  } else {
    page = parseInt(page);
  }

  const count = await CampaignModel.countDocuments();

  const campaignDocs = await CampaignModel.find()
    .select(selectFieldsShow(fields))
    .limit(limit)
    .skip(limit * (page - 1))
    .sort(sort)
    .lean();

  return {
    total: count,
    limit,
    page,
    totalPages: Math.ceil(count / limit),
    campaigns: campaignDocs,
  };
};

const getById = (id) => {
  return CampaignModel.findOne({ _id: id });
};

const insert = (data) => {
  return CampaignModel.create(data);
};

const selectFieldsShow = (fields) => {
  if (fields) {
    return fields.split(',').join(' ');
  }

  return '';
};

module.exports = {
  updateById,
  getAll,
  getById,
  insert,
  CampaignModel,
};
