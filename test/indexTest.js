'use strict';

const assert = require('assertthat');

const index = require('../lib');

suite('index', () => {
  test('is an object.', async () => {
    assert.that(index).is.ofType('object');
  });
});
