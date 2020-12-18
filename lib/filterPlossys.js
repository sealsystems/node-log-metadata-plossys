'use strict';

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

  //printer-filtering
  if (printer) {
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
