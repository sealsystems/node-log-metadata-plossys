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
const log = require('@sealsystems/log-metadata-plossys')(require('@sealsystems/log').getLogger());
```

Now you can use the `log` object as usual, but `job` and `printer` will be reduced. [see lib/decorate.js](lib/decorate.js)

```javascript
const processJob = function(myJob, myPrinter) {
  log.info('Processing job.', {
    job: myJob,
    printer: myPrinter,
    any: 'additionalAttribute'
  });
};

// metadata output
// {
//   uuid: 'xxxxx-yyyy-xxx-aaa-bbb',
//   jobId: 'xxxxx',
//   printer: 'printer1',
//   any: 'additionalAttribute'
// }
```

## Recipes

### job

```diff
log.info('...', {
-  uuid: job._id,
-  jobId: job.refId
+  job
});
```

```diff
const id = '80bf257d-f657-4592-9c03-856e2dc68655'; // in some cases you might not have/need the entire job object just in uuid

log.info('...', {
   uuid: id,
-  jobId: id.substr(0,8)
});
```

### printer

```diff
log.info('...', {
-  printer: printer._id
+  printer
});
```

```diff
log.info('...', {
-  printer: job.current.printerName.toLowerCase()
+  printer: job.current.printerName
});
```
