const { createLogger, format, transports, addColors } = require("winston");
const path = require("path");

const logFormat = format.printf((info) => {
  const { timestamp, level, label, message, ...rest } = info;
  let log = `[${timestamp}] - ${level} [${label}]: ${message}`;
  if (!(Object.keys(rest).length === 0 && rest.constructor === Object)) {
    log = `${log}\n${JSON.stringify(rest, null, 2)}`.replace(/\\n/g, "\n");
  }
  return log;
});

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.errors({ stack: true }),
    format.label({ label: path.basename(require.main.filename) }),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
  ),
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});
module.exports = logger;
