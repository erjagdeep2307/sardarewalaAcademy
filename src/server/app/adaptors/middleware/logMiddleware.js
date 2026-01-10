import { randomUUID } from "crypto";
import logger from "#logger";
/**
 * Attaches a request-scoped logger to req.log
 */
export default function requestLogger(req, res, next) {
  const requestId = req.headers["x-request-id"] || randomUUID();

  // Child logger with request context
  req.log = logger.child({
    requestId,
    method: req.method,
    path: req.originalUrl,
  });

  const start = process.hrtime.bigint();

  res.on("finish", () => {
    const durationMs =
      Number(process.hrtime.bigint() - start) / 1_000_000;

    req.log.info(
      {
        statusCode: res.statusCode,
        durationMs: Math.round(durationMs),
      },
      "HTTP request completed"
    );
  });

  next();
}
