import pino from "pino";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  formatters: {
    level(label) {
      return { level: label.toUpperCase() };
    },
  },
  base:null,
  // base: {
  //   service: "backend-api",
  //   env: process.env.NODE_ENV,
  // },

  redact: {
    paths: [
      "req.headers.authorization",
      "password",
      "token",
    ],
    censor: "[REDACTED]",
  },
});

export default logger;
