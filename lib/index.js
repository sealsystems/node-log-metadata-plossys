'use strict';

const decorate = require('./decorate');

module.exports = (log, levels = ['debug', 'info', 'warn', 'error']) => {
  const metadataLog = levels.reduce((proxy, level) => {
    proxy[level] = (msg, metadata) => {
      return log[level](msg, metadata ? decorate(metadata) : undefined);
    };
    return proxy;
  }, {});

  return metadataLog;
};
