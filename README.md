# node-log-metadata-plossys

Generates metadata for log messages in PLOSSYS 5

## Introduction

This module creates an object with metadata required to associate a log message with a print job or printer. Additional attributes may also be added to this metadata.  

First, install the module:

```sh
npm install @sealsystems/log-metadata-plossys
```

Require the log module and this one:

```javascript
const log = require('@sealsystems/log').getLogger();
const logMetadata = require('@sealsystems/log-metadata-plossys');
```

Now you can generate appropriate metadata:

```javascript
const processJob = function(job) {
  const metadata = logMetadata(job)({ additionalAttribute: true });

  //  -> {<Necessary attributes from job>, additionalAttribute: true }
  
  log.info('Processing job.', metadata);
}
```

To streamline code containing multiple log messages, the function which injects the necessary metadata can be reused:

```javascript
const processJob = function(job) {
  const inject = logMetadata(job);
  
  log.info('Start processing job.', inject({ additionalAttribute: true }));

  // ...

  log.info('End processing job.', inject({ additionalAttribute: false, anotherAttribute: 'foo' }));
}
```

An error will be thrown if you do not use a job object for creating the `inject` function:

```javascript
const inject = logMetadata({ /* This object does not contain the necessary attributes */ });

// -> throws error
}
```

Overwriting one of the attributes necessary for associating the log message to a job or printer results in a warning log message. Also, the added attribute will be prefixed with `additional_`:

```javascript
  const inject = logMetadata(job);
  
  log.info('Foo', inject({ uuid: 'bar' }));

  // -> Log message: { level: 'warn', message: 'Attempting to overwrite necessary log metadata.', metadata: { additionalAttributes: ['uuid'] } }

  // -> Resulting metadata object: { <Necessary attributes from job>, additional_uuid: 'bar' }
```

Please note: In order to keep the system running despite the programming error, we do not throw an error in this case.
