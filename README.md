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

Now you can use the `log` object as usual, but `job` and `printer will be reduced. [see lib/decorate.js](lib/decorate.js)

```javascript
const processJob = function(myJob, myPrinter) {
  log.info('Processing job.', {
    job: myJob,
    printer: myPrinter,
    any: 'additionalAttribute'
  });
};
```
