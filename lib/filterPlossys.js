'use strict';

module.exports = ({ meta, job, printer }) => {
  const obj = {
    job: {},
    printer: {}
  };

  //job-filtering
  if (job) {
    obj.job._id = job._id ? job._id : 'n/a';
    obj.job.fileName = job.fileName ? job.fileName : 'n/a';
    obj.job.refId = job.refId ? job.refId : 'n/a';
    obj.job.status = job.status ? job.status : 'n/a';
    if (job.current) {
      obj.job.jobName = job.current.jobName ? job.current.jobName : 'n/a';
      obj.job.printerName = job.current.printerName ? job.current.printerName : 'n/a';
    }
  }

  //printer-filtering
  if (printer) {
    obj.printer._id = printer._id ? printer._id : 'n/a';
    if (printer.runtime) {
      obj.printer.status = printer.runtime.status ? printer.runtime.status : 'n/a';
    }
    if (printer.config) {
      obj.printer.printer = printer.config.printer ? printer.config.printer : 'n/a';
      obj.printer.connection = printer.config.connection ? printer.config.connection : 'n/a';
    }
  }

  return {
    ...obj,
    ...meta
  };
};
