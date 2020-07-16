const axios = require('axios');
const axiosRetry = require('axios-retry');
const {
  ValidateEmailError,
} = require('./errors');

axiosRetry(axios, { retries: 3 });
const DELAY = 500;

/**
 *
 * @param {object} param
 * @param {string} [param.url]
 * @param {string} [param.path]
 * @param {string} param.method
 * @param {*} param.data
 * @param {string} param.rootField
 * @param {number} [param.delay]
 */
function makeRequestConfig({ url, path, method, data, rootField, delay }) {
  if (!url) {
    url = `https://validmail.seapi.net${path}`;
  }
  return {
    url,
    method,
    data,
    rootField,
    delay,
  };
}

/**
 * Delay default: 500 ms
 * @param {object} param
 * @param {string} param.url
 * @param {string} param.method
 * @param {object} [param.headers]
 * @param {*} [param.data]
 * @param {string} [param.rootField]
 * @param {number} [param.delay]
 */
function sendRequest({ url, method, headers, data, rootField, delay = DELAY }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      axios({ url, method, headers, data })
        .then((response) => {
          resolve(handleResponse(response, rootField));
        })
        .catch((error) => {
          handleError(error);
        })
        .catch((error) => {
          reject(error);
        });
    }, delay);
  });
}

/**
 *
 * @param {object} response
 * @param {string} [rootField]
 */
function handleResponse(response, rootField) {
  if (rootField && typeof rootField === 'string') {
    return response.data[rootField];
  }
  return response.data;
}

/**
 * @throws error
 */
function handleError(error) {
  if (error.response) {
    // let status = error.response.status;
    let message =
      error.response.data && error.response.data.message
        ? error.response.data.message
        : error.response.statusText;

    throw new ValidateEmailError(message)
  }

  throw new ValidateEmailError();
}

module.exports = {
  makeRequestConfig,
  sendRequest,
};
