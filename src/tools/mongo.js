const debug    = require('debug')('server:mongo');
const mongoose = require('mongoose');
const registry = require('@eoko/service-registry');

module.exports = (url) => {
  return () => new Promise((res) => {
    const uri = url || registry.getService('mongo').getUri();

    debug(`connecting to ${uri}`);
    mongoose.connect(`mongo://${uri}`);

    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });

    mongoose.connection.on('connected', () => debug(`Mongoose default connection open to ${uri}`));
    mongoose.connection.on('error', err => debug(`Mongoose default connection error`, err));
    mongoose.connection.on('disconnected', err => debug('Mongoose default connection disconnected', err));
    res();
  })

};