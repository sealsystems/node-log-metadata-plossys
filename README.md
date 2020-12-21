# node-log-metadata-plossys

Generates metadata for log messages in PLOSSYS 5

## Introduction

This module creates an object with metadata required to associate a log message with a print job or printer. Additional attributes may also be added to this metadata.  

First, install the log module and this one:

```sh
npm install @sealsystems/log @sealsystems/log-metadata-plossys
```

Require both modules:

```javascript
const log = require('@sealsystems/log').getLogger();
const logMetadata = require('@sealsystems/log-metadata-plossys');
```

Now you can generate appropriate metadata:

```javascript
const processJob = function(myJob, myPrinter) {
  log.info('Processing job.', logMetadata({ 
    job: myJob, 
    printer: myPrinter 
  }));
}
```

## Filters on job and printer object

Calling `logMetadata()` with job and printer objects filters for the most important attributes. 

### job returns with

- _id
- fileName
- refId (mapped to uuid)
- status
- jobName
- printerName

### printer returns with

- _id
- status
- printer
- connection

If you need additional metadata beside job and printer you may add a generic metadata object:

```javascript
const processJob = function(genericMetadata, myJob, myPrinter) {
  log.info('Processing job.', logMetadata({
    metadata: genericMetadata, 
    job: myJob, 
    printer: myPrinter
  }))
}
```

If you are missing some attributes while logging, you can still use `logMetadata()`.

```javascript
const doStuff = function(jobId){
  log.info('My message.', logMetadata({
    job: {_id: jobId, status: 'waitprocessing'},
    printer: {printerName: 'myPrinter43'}
  }))
}
```

The output will look like this:

```json
{
  message: 'My message.',
  metadata: {
    job: {
      _id: 'myJobId123',
      fileName: 'n/a',
      uuid: 'n/a',
      status: 'job-waitprocessing',
      jobName: 'n/a',
      printerName: 'n/a'
    },
    printer: {
      _id: 'n/a',
      status: 'n/a',
      printer: 'myPrinter43',
      connection: 'n/a'
    },

  }
}
```

If a property is missing, it will be replaced with `'n/a'`

**NOTE:** while using `logMetadata()` the job and printer attribute are nested within the default `metadata` object.
This prevents overwriting of specific attributes like `_id` and `status`.
