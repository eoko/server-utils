const debug         = require('debug')('server:sentry');
const winston       = require('winston');
const winstonSentry = require('winston-sentry');

module.exports = (opts) => {
  const level = opts.level || 'warn';
  const dsn   = opts.dsn;

  return () => {
    debug(`Sentry will be used with a level '${level}' and a DSN '${dsn}'.`);
    winston.transports.Sentry = winstonSentry;
    winston.add(winston.transports.Sentry, { dsn, level });
  }

};
