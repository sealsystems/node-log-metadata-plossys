/* eslint-disable mocha/no-synchronous-tests */
'use strict';

const assert = require('assertthat');

const decorate = require('../lib/decorate');

suite('/lib/decorate', () => {
  test('decorates nothing', () => {
    assert
      .that(decorate({ noJob: true, noPrinter: true, foo: 'bar', foobar: 42 }))
      .is.sameJsonAs({ noJob: true, noPrinter: true, foo: 'bar', foobar: 42 });
  });

  test('decorates job key', () => {
    const acutal = decorate({
      job: {
        _id: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
        refId: 'xxxxxxxx',
        lcCurrent: { printerName: 'Printer42' },
        status: 'waitprocessing'
      },
      noPrinter: true,
      foo: 'bar',
      foobar: 42
    });

    const expected = {
      job: {
        uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
        jobId: 'xxxxxxxx',
        status: 'waitprocessing',
        printer: 'Printer42'
      },
      noPrinter: true,
      foo: 'bar',
      foobar: 42
    };

    assert.that(acutal).is.sameJsonAs(expected);
  });

  test('decorates printer key', () => {
    const acutal = decorate({
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
      noPrinter: true,
      foo: 'bar',
      foobar: 42
    });

    const expected = {
      printer: {
        printer: 'printer42',
        printerName: 'Printer42',
        connection: 'socket://localhost:9100',
        nativeQueue: true,
        status: 'idle'
      },
      noPrinter: true,
      foo: 'bar',
      foobar: 42
    };

    assert.that(acutal).is.sameJsonAs(expected);
  });

  test('decorates job and printer keys', () => {
    const acutal = decorate({
      job: {
        _id: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
        refId: 'xxxxxxxx',
        lcCurrent: { printerName: 'Printer42' },
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
      job: {
        uuid: 'xxxxxxxx-yyyy-aaaa-bbbb-cccccccc',
        jobId: 'xxxxxxxx',
        status: 'waitprocessing',
        printer: 'Printer42'
      },
      printer: {
        printer: 'printer42',
        printerName: 'Printer42',
        connection: 'socket://localhost:9100',
        nativeQueue: true,
        status: 'idle'
      },
      foo: 'bar',
      foobar: 42
    };

    assert.that(acutal).is.sameJsonAs(expected);
  });
});