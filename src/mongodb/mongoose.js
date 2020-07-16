const mongoose = require('mongoose');

/**
 *
 * @param {string} connectionString
 * @param {object} options
 * @param {string} [options.user]
 * @param {string} [options.pass]
 *
 */
function create(logger, connectionString, options = {}) {
  mongoose.connection.on('connecting', () => {
    logger.info('Connecting to mongodb');
  });

  mongoose.connection.on('connected', () => {
    logger.info('Connected to mongodb');
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('Disconnected mongodb');
  });

  mongoose.connection.on('error', (err) => {
    logger.error(err.message);
  });

  mongoose.connection.on('reconnectFailed', (err) => {
    logger.warn('Reconnect to mongodb falied');
    logger.error(err || '');
    process.exit(1);
  });

  mongoose.connect(connectionString, {
    user: options.user,
    pass: options.pass,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  return mongoose;
}

module.exports = {
  create,
};
