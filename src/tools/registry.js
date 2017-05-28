const registry = require('@eoko/service-registry');
const debug    = require('debug')('server:registry');
const request  = require('../utils/requestRetry');

module.exports = () => {
  process.on('message', (rs, err) => {
    if (err) {
      debug(`Error in process`, err);
      return;
    }

    if (rs && rs.topic === 'service:update') {
      debug(`Service update`, rs.data);
      registry.sync(rs.data || []);
    }
  });

  return request({
    url: 'http://localhost:20000/ready',
    json: true,

    maxAttempts: 5,
    retryDelay: 2000,
  })
    .then(() => request({
        url: 'http://localhost:20000/services',
        json: true,

        maxAttempts: 5,
        retryDelay: 2000,
      }
    ))
    .then(res => {
      registry.sync(res);
    })
};
