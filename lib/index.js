'use strict';

const inspect = require('./inspect');

module.exports = (log, levels = ['debug', 'info', 'warn', 'error']) => {
  const metadataLog = levels.reduce((proxy, level) => {
    proxy[level] = (msg, metadata) => {
      return log[level](msg, metadata ? inspect(metadata) : undefined);
    };
    return proxy;
  }, {});

  return metadataLog;
};
