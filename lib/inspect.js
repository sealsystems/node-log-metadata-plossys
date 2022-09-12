'use strict';

module.exports = ({ job, printer, uuid, ...additionalMetadata }) => {
  const plossysMetadata = {};
  if (job) {
    if (typeof job === 'object') {
      plossysMetadata.uuid = job._id || job.id;
      plossysMetadata.jobId = job.refId || job?._id?.substr(0, 8) || job?.id?.substr(0, 8);
      plossysMetadata.printer =
        job.current && job.current.printerName && job.current.printerName.toLowerCase
          ? job.current.printerName.toLowerCase()
          : undefined;
    } else {
      plossysMetadata.job = job;
    }
  }

  if (printer) {
    if (typeof printer === 'object') {
      plossysMetadata.printer = printer._id;
    } else if (printer.toLowerCase) {
      plossysMetadata.printer = printer.toLowerCase();
    } else {
      plossysMetadata.printer = printer;
    }
  }

  if (uuid) {
    plossysMetadata.uuid = uuid;
    if (uuid.substr) {
      plossysMetadata.jobId = uuid.substr(0, 8);
    }
  }

  return {
    ...plossysMetadata,
    ...additionalMetadata
  };
};
