'use strict';

const assert = require('assertthat');

const log = require('@sealsystems/log').getLogger();
const filterPlossys = require('../lib/filterPlossys');

const mockJob = {
  orig: {
    sourceHost: 'archlinux',
    userName: 'tol',
    jobName: '5Bgb',
    fileName: 'docs/document-a4.pdf',
    printerName: 'printer1',
    checkinType: 'lpr',
    server: '99966e148466',
    creator: '',
    arrivedTime: 1608280547291.0,
    checkinTime: 1608280547459.0,
    fileSize: 1062429,
    copies: 1
  },
  current: {
    sourceHost: 'archlinux',
    userName: 'tol',
    jobName: '5Bgb',
    fileName: 'docs/document-a4.pdf',
    printerName: 'printer1',
    checkinType: 'lpr',
    server: '99966e148466',
    creator: '',
    arrivedTime: 1608280547291.0,
    checkinTime: 1608280547459.0,
    fileSize: 1062429,
    copies: 1,
    fileFormat: 'application/postscript'
  },
  status: 'job-waitprocessing',
  fileName: ['799e3cb6-e58e-4048-a882-5b0c7a0b869f'],
  stages: [
    {
      fileName: '48727e72-20e8-446b-b0fd-9a00f212a07c',
      mimeType: 'application/pdf',
      createdBy: 'checkin',
      createdAt: 1608280547460.0,
      context: {
        type: 'lpr'
      }
    },
    {
      fileName: '799e3cb6-e58e-4048-a882-5b0c7a0b869f',
      mimeType: 'application/postscript',
      createdBy: 'convert-pdf2ps',
      createdAt: 1608280548491.0,
      context: {}
    }
  ],
  refId: '48727e72',
  lcCurrent: {
    sourceHost: 'archlinux',
    userName: 'tol',
    jobName: '5bgb',
    fileName: 'docs/document-a4.pdf',
    printerName: 'printer1',
    checkinType: 'lpr',
    server: '99966e148466',
    creator: '',
    arrivedTime: 1608280547291.0,
    checkinTime: 1608280547459.0,
    fileSize: 1062429,
    copies: 1,
    fileFormat: 'application/pdf'
  }
};

const mockPrinter = {
  _id: 'printer9000',
  config: {
    printer: 'printer9000',
    connection: 'socket://printers:9000',
    nativeQueue: true,
    server: '17d2595f917a',
    webUrl: 'http://printers',
    connectionHostname: 'printers'
  },
  runtime: {
    status: 'idle',
    currentPrintingJob: '',
    lastPrintedJobTime: 0,
    queuedJobs: 0
  }
};

const mockMeta = {
  status: 'status from metadata',
  random: 12,
  'random float': 51.138,
  bool: false,
  date: '1993-08-13',
  enum: 'online',
  firstname: 'Lauryn',
  lastname: 'Fredi',
  city: 'Santa Cruz de Tenerife',
  countryCode: 'LI',
  'email uses current data': 'Lauryn.Fredi@gmail.com',
  'email from expression': 'Lauryn.Fredi@yopmail.com'
};

const log2 = {
  info: (message, metadata) => {
    const logData = {
      message,
      metadata
    };
    console.log(logData);
    return logData;
  }
};

suite('index', () => {
  test('logs without filter', async () => {
    log2.info('message', mockJob);
  });

  test.only('logs with incomplete job object', async () => {
    log2.info('message', filterPlossys({ job: { _id: 'id-123' } }));
  });

  test('logs with incomplete printer object', async () => {
    log.info('message', filterPlossys({ printer: { config: { connection: 'https://nowhere.net' } } }));
  });

  test('logs with complete job object', async () => {
    log.info('message', filterPlossys({ job: mockJob }));
  });

  test('logs with complete printer object', async () => {
    log.info('message', filterPlossys({ printer: mockPrinter }));
  });

  test('logs with complete job and printer object', async () => {
    log.info('message', filterPlossys({ job: mockJob, printer: mockPrinter }));
  });

  test('logs with metadata, complete job and printer object', async () => {
    log.info('message', filterPlossys({ ...mockMeta, job: mockJob, printer: mockPrinter }));
  });
});
