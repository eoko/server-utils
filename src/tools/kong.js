const debug    = require('debug')('server:kong');
const registry = require('@eoko/service-registry');
const kong     = require('@eoko/kong-client');

module.exports = (url) => {
  return () => {
    const uri = url || `http://${registry.getService('kong-8001').getUri()}`;

    kong.getKong().setBaseUrl(uri);
    debug(`kong is ready to use with require('@eoko/kong-client').getKong();`);
  }
};