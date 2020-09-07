"use strict";

var fs = require("fs");
var bunyan = require("bunyan");
var mocha = require("mocha");
var PrettyStream = require("@ambassify/bunyan-prettystream");

var OPT_FILE_NAME =
  process.env.MOCHA_PRETTY_BUNYAN_CONFIG || "test/mocha-pretty-bunyan.json";

var reporter = mocha.reporters.Spec,
  mute = false,
  level = "trace";

if (fs.existsSync(OPT_FILE_NAME)) {
  var config = JSON.parse(fs.readFileSync(OPT_FILE_NAME));

  if (config.reporter) {
    if (mocha.reporters[config.reporter] !== undefined) {
      // default mocha reporter ?
      reporter = mocha.reporters[config.reporter];
    } else {
      // try to require it
      reporter = require(config.reporter);
    }
  }

  mute = config.mute || mute;
  level = config.level || level;
}

var prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

var _createLogger = bunyan.createLogger;
bunyan.createLogger = function (options) {
  options.streams = [
    {
      level: mute ? 99 : options.level || level,
      type: "raw",
      stream: prettyStdOut,
    },
  ];

  return _createLogger(options);
};

module.exports = reporter;
