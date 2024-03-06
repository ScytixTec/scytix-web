import { createLogger, format } from "winston";
import WinstonCloudwatch from "winston-cloudwatch";

export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.json(),
  transports: [
    new WinstonCloudwatch({
      level: "error",
      logGroupName: "ErrorGroup",
      logStreamName: "errors",
      awsOptions: {
        credentials: {
          accessKeyId: "secret",
          secretAccessKey: "secret",
        },
      },
    }),
    new WinstonCloudwatch({
      level: "info",
      logGroupName: "InfoGroup",
      logStreamName: "info",
      awsOptions: {
        credentials: {
          accessKeyId: "secret",
          secretAccessKey: "secret",
        },
      },
    }),
  ],
});
