'use strict';

module.exports = ({ job, printer, ...additionalMetadata }) => {
  const plossysMetadata = {};
  if (job) {
    if (typeof job === 'object') {
      plossysMetadata.uuid = job._id;
      plossysMetadata.jobId = job.refId;
    } else {
      plossysMetadata.job = job;
    }
  }

  if (printer) {
    if (typeof printer === 'object') {
      plossysMetadata.printer = printer._id;
    } else {
      plossysMetadata.printer = printer;
    }
  }

  return {
    ...plossysMetadata,
    ...additionalMetadata
  };
};
