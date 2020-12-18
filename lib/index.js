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
  if (job === null) {
    return {};
  }
  const { _id: uuid = warn('uuid'), refId: jobId = warn('jobId'), status = warn('status') } = job;
  return { uuid, jobId, status };
};

const createPrinterMetadata = (printerObject = null) => {
  if (printerObject === null) {
    return {};
  }

  const { _id: printer = warn('printer'), config = {}, runtime = {} } = printerObject;

  const {
    printer: printerName = warn('printerName'),
    connection = warn('connection'),
    nativeQueue = false,
    pickup = false
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
    ...metadata
  };
};

const levels = ['debug', 'info', 'warn', 'error'];

// module.exports = (log) => {
//   const metadataLog = levels.reduce((proxy, level) => {
//     proxy[level] = (msg, metadata, context = {}) => {
//       return log[level](msg, combine(metadata, context));
//     };
//     return proxy;
//   }, {});

//   return metadataLog;
// };

const data = {
  data: '1'
};

const myJob = {
  filename: 'myfile.txt',
  status: 'waitprocessing'
};

const myPrinter = {
  id: 'printer1',
  runtime: {
    status: 'idle'
  },
  config: {
    connection: 'https://google.com'
  }
};

//     log.info('tralalalal', logMetadata({ meta, job, printer }));

module.exports = ({ meta, job, printer }) => {
  const obj = {
    job: {},
    printer: {}
  };

  //job-filtering
  if (job) {
    obj.job._id = job._id ? job._id : undefined;
    obj.job.fileName = job.fileName ? job.fileName : undefined;
    obj.job.refId = job.refId ? job.refId : undefined;
    obj.job.status = job.status ? job.status : undefined;
    if (job.current) {
      obj.job.jobName = job.current.jobName ? job.current.jobName : undefined;
      obj.job.printerName = job.current.printerName ? job.current.printerName : undefined;
    }
  }
  if (printer) {
    //printer-filtering
    obj.printer._id = printer._id ? printer._id : undefined;
    if (printer.runtime) {
      obj.printer.status = printer.runtime.status ? printer.runtime.status : undefined;
    }
    if (printer.config) {
      obj.printer.printer = printer.config.printer ? printer.config.printer : undefined;
      obj.printer.connection = printer.config.connection ? printer.config.connection : undefined;
    }
  }
  return {
    ...obj,
    ...meta
  };
};
