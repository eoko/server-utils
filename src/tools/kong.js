const debug    = require('debug')('server:mongo');
const registry = require('@eoko/service-registry');
const kong     = require('@eoko/kong-client');

module.exports = () => {
  const uri = registry.getService('kong-8001')
                      .getUri();
  kong.getKong()
      .setBaseUrl(uri);
};