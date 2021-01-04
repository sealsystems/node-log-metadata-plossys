/* eslint-disable mocha/no-synchronous-tests */
'use strict';

const assert = require('assertthat');

const log = require('../lib')(require('@sealsystems/log').getLogger());

suite(`lib/index wraps "require('@sealsystems/log').getLogger()" and the wrapped object`, () => {
  test('has error function', () => {
    assert.that(log.error).is.ofType('function');
  });

  test('has warn function', () => {
    assert.that(log.warn).is.ofType('function');
  });

  test('has info function', () => {
    assert.that(log.info).is.ofType('function');
  });

  test('has debug function', () => {
    assert.that(log.debug).is.ofType('function');
  });
});
