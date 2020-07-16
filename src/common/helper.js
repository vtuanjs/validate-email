function isNotUndefinedOrNull(entity) {
  if (entity === undefined || entity === null) {
    return false;
  }
  return true;
}
undefined;
/**
 *
 * @param {number} ms Use the unit is milliseconds
 */
function waitByPromise(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  isNotUndefinedOrNull,
  waitByPromise,
};
