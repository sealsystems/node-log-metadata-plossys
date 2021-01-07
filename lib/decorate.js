'use strict';

module.exports = ({ job, printer, uuid, ...additionalMetadata }) => {
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
