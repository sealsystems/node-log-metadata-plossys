'use strict';

const createJobMetadata = (job = {}) => {
  if (typeof job !== 'object') {
    return job;
  }
  return {
    uuid: job._id,
    jobId: job.refId,
    status: job.status,
    printer: job.lcCurrent ? job.lcCurrent.printerName : undefined
  };
};

const createPrinterMetadata = (printer = {}) => {
  if (typeof printer !== 'object') {
    return printer;
  }
  return {
    printer: printer._id,
    printerName: printer.config ? printer.config.printer : undefined,
    connection: printer.config ? printer.config.connection : undefined,
    nativeQueue: printer.config ? printer.config.nativeQueue : undefined,
    status: printer.runtime ? printer.runtime.status : undefined
  };
};

module.exports = ({ job, printer, ...additionalMetadata }) => {
  const plossysMetadata = {};
  if (job) {
    plossysMetadata.job = createJobMetadata(job);
  }
  if (printer) {
    plossysMetadata.printer = createPrinterMetadata(printer);
  }

  return {
    ...plossysMetadata,
    ...additionalMetadata
  };
};
