'use strict';

const yargs = require('yargs').env(true).help('h').alias('h', 'help');

const cmdArgs = yargs.usage('Usage: [options]', {
  port: {
    description: 'Service HTTP(s) port.',
    required: false,
    default: 8080
  }
}).argv;

module.exports = cmdArgs;