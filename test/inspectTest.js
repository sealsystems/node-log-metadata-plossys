/* eslint-disable mocha/no-synchronous-tests */
'use strict';

const assert = require('assertthat');

const inspect = require('../lib/inspect');

suite('/lib/inspect', () => {
  test('passes through every attributes as-is', () => {
    assert
      .that(inspect({ noJob: true, noPrinter: true, foo: 'bar', foobar: 42 }))
      .is.sameJsonAs({ noJob: true, noPrinter: true, foo: 'bar', foobar: 42 });
  });

  test('passes through printer and job attributes if they are not in expected format', () => {
    assert
      .that(
        inspect({
          job: 'not a valid job properties object',
          printer: 1234,
          foo: 'bar',
          foobar: 42
        })
      )
      .is.sameJsonAs({
        job: 'not a valid job properties object',
        printer: 1234,
        foo: 'bar',
        foobar: 42
      });
  });

  test('inspects job key', () => {
    const actual = inspect({
      job: {
        _id: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
        refId: 'xxxxxxxx',
        current: { printerName: 'Printer42' },
        status: 'waitprocessing'
      },
      noPrinter: true,
      foo: 'bar',
      foobar: 42
    });

    const expected = {
      uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
      jobId: 'xxxxxxxx',
      printer: 'printer42',
      noPrinter: true,
      foo: 'bar',
      foobar: 42
    };

    assert.that(actual).is.sameJsonAs(expected);
  });

  test('inspects job key without refId', () => {
    const actual = inspect({
      job: {
        _id: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc'
      }
    });

    const expected = {
      uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
      jobId: 'xxxxxxxx'
    };

    assert.that(actual).is.sameJsonAs(expected);
  });

  test('inspects job key with id', () => {
    const actual = inspect({
      job: {
        id: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc'
      }
    });

    const expected = {
      uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
      jobId: 'xxxxxxxx'
    };

    assert.that(actual).is.sameJsonAs(expected);
  });

  test('inspects job key with user', () => {
    const actual = inspect({
      job: {
        id: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
        current: { userName: 'user42' }
      }
    });

    const expected = {
      uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
      jobId: 'xxxxxxxx',
      userName: 'user42'
    };

    assert.that(actual).is.sameJsonAs(expected);
  });

  test('inspects printer key', () => {
    const actual = inspect({
      printer: {
        _id: 'printer42',
        config: {
          connection: 'socket://localhost:9100',
          printer: 'Printer42',
          nativeQueue: true
        },
        runtime: {
          status: 'idle'
        }
      },
      noJob: true,
      foo: 'bar',
      foobar: 42
    });

    const expected = {
      printer: 'printer42',
      noJob: true,
      foo: 'bar',
      foobar: 42
    };

    assert.that(actual).is.sameJsonAs(expected);
  });

  test('inspects job and printer keys', () => {
    const actual = inspect({
      job: {
        _id: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
        refId: 'xxxxxxxx',
        current: { printerName: 'Printer42' },
        status: 'waitprocessing'
      },
      printer: {
        _id: 'printer42',
        config: {
          connection: 'socket://localhost:9100',
          printer: 'Printer42',
          nativeQueue: true
        },
        runtime: {
          status: 'idle'
        }
      },
      foo: 'bar',
      foobar: 42
    });

    const expected = {
      uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
      jobId: 'xxxxxxxx',
      printer: 'printer42',
      foo: 'bar',
      foobar: 42
    };

    assert.that(actual).is.sameJsonAs(expected);
  });

  test('sets jobId even if only uuid available', () => {
    const actual = inspect({
      uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
      noPrinter: true,
      foo: 'bar',
      foobar: 42
    });

    const expected = {
      uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
      jobId: 'xxxxxxxx',
      noPrinter: true,
      foo: 'bar',
      foobar: 42
    };

    assert.that(actual).is.sameJsonAs(expected);
  });

  test('sets printer to lowercase ', () => {
    const actual = inspect({
      printer: 'This IS PRiNTeR nAME',
      foo: 'bar',
      foobar: 42
    });

    const expected = {
      printer: 'this is printer name',
      foo: 'bar',
      foobar: 42
    };

    assert.that(actual).is.sameJsonAs(expected);
  });
});
