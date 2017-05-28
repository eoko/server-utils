const debug = require('debug')('server:request');
const request  = require('requestretry');

module.exports = (conf) => {
  return new Promise((res, rej) => {
    request(conf, (err, response, body) => {
      if (err) rej(err);
      debug(`Request attempts for ${conf.url}: ${response.attempts}`);
      res(body);
    })
  })
};