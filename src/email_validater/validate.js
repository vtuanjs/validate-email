const common = require('./common');

/**
 * @param {object} param
 * @param {string} param.accessToken
 * @param {number} [param.delay]
 */
function validateEmails({ emails, delay }) {
  let config = common.makeRequestConfig({
    path: '/',
    method: 'POST',
    data: emails,
    delay,
  });
  return common.sendRequest(config);
}

module.exports = {
  validateEmails,
};
