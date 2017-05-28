const debug    = require('debug')('server:mongo');
const registry = require('@eoko/service-registry');
const kong     = require('@eoko/kong-client');

module.exports = (url) => {
  return () => {
    const uri = url || registry.getService('kong-8001').getUri();
    kong.getKong().setBaseUrl(uri);
  }
};