const multer = require('multer');
const path = require('path');
const createFolder = require('./create_folder');

const create = ({ fileSizeMB, filePath }) => {
  if (!filePath) {
    filePath = `${path.join(__dirname, `../../public/files`)}`;
  }

  createFolder(filePath);
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, filePath);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  const upload = multer({
    limits: {
      fileSize: fileSizeMB * 1024 * 1024,
    },
    storage,
  });

  return { upload, multer };
};

module.exports = {
  create,
};
