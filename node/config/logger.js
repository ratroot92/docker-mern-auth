const {transports, createLogger, format} = require('winston');
require('winston-daily-rotate-file');

var infoTransport = new transports.DailyRotateFile({
  filename: 'info_log-%DATE%.log',
  dirname:'./logs/info/',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'info'
});
infoTransport.on('rotate', function(oldFilename, newFilename) {
  // do something fun
});

var errorTransport = new transports.DailyRotateFile({
  filename: 'error_log-%DATE%.log',
  dirname:'./logs/error/',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error'
});

var logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),

),
  transports: [
    infoTransport,errorTransport
  ]
});

module.exports=logger