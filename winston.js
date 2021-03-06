var winston = require('winston');

var options = {
  file: {
    level: 'info',
    filename: `./applog/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, 
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};



var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, 
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;