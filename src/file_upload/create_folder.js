const fs = require('fs');

/**
 *
 * @param {string} path
 */
const createFolder = (path) => {
  return new Promise((resolve, reject) => {
    return fs.mkdir(path, { recursive: true }, (err) => {
      if (err) reject(err);

      resolve('Success');
    });
  });
};

module.exports = createFolder;
