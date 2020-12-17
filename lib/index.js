'use strict';

// return {
//   info: (msg, metadata, { job, printer }) => {
//     return log.info(msg, {
//       uuid: job._id,
//       printer: printer._id,
//       status: job.status,
//       status: printer.runtime.status,
//       ...metadata,
//     });
//   },
// };

const warn = (key) => `!!! ${key} not found !!!`;

const createJobMetadata = (job = null) => {
  if (job === null) return {};
  const { _id: uuid = warn('uuid'), refId: jobId = warn('jobId'), status = warn('status') } = job;
  return { uuid, jobId, status };
};

const createPrinterMetadata = (printerObject = null) => {
  if (printerObject === null) return {};

  // {
  //   "_id" : "printer9000",
  //   "config" : {
  //     "printer" : "printer9000",
  //     "connection" : "socket://printers:9000",
  //     "nativeQueue" : true,
  //     "server" : "17d2595f917a",
  //     "webUrl" : "http://printers",
  //     "connectionHostname" : "printers"
  //   },
  //   "runtime" : {
  //     "status" : "idle",
  //     "currentPrintingJob" : "",
  //     "lastPrintedJobTime" : 0,
  //     "queuedJobs" : 0
  //
  // }

  const { _id: printer = warn('printer'), config = {}, runtime = {} } = printerObject;

  const {
    printer: printerName = warn('printerName'),
    connection = warn('connection'),
    nativeQueue = false,
    pickup = false,
  } = config;

  const { status: printerStatus = warn('printerStatus') } = runtime;

  return { printer, printerName, connection, nativeQueue, pickup, printerStatus };
};

const combine = (metadata, { job, printer }) => {
  const jobMetadata = createJobMetadata(job);
  const printerMetadata = createPrinterMetadata(printer);

  return {
    ...jobMetadata,
    ...printerMetadata,
    ...metadata,
  };
};

const levels = ['debug', 'info', 'warn', 'error'];

module.exports = (log) => {
  const metadataLog = levels.reduce((proxy, level) => {
    proxy[level] = (msg, metadata, context = {}) => {
      return log[level](msg, combine(metadata, context));
    };
    return proxy;
  }, {});

  return metadataLog;
};
