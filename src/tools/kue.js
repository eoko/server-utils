const debug = require('debug')('server:kue');
const registry = require('@eoko/service-registry');
const kue = require('kue');

/**
 * sample uri : 'redis://example.com:1234?redis_option=value&redis_option=value'
 *
 * @param uri
 * @returns {function()}
 */
module.exports = (uri) => {
  return () => {
    const redis = uri || `redis://${registry.getService('redis-6379').getUri()}`;

    kue.createQueue({ redis });
    debug('kue is ready to use with kue.createQueue()');
  }
};