import { randomUUID } from "crypto";
import { createLogger, format, transports } from "winston";
import WinstonCloudwatch = require("winston-cloudwatch");

export type LoggerConfig =
  | {
      type: "local";
      level: string;
    }
  | {
      type: "aws";
      level: string;
      region: string;
      serviceName: string;
      stage: string;
      version: string;
    };

export interface LoggerMessage {
  message: string;
}

export interface ScytixLogger {
  debug: (data: LoggerMessage) => void;
  error: (data: LoggerMessage) => void;
  info: (data: LoggerMessage) => void;
  silly: (data: LoggerMessage) => void;
  warn: (data: LoggerMessage) => void;
  close: () => void;
}

let logger: ScytixLogger;

export const initLogger = (config: LoggerConfig): ScytixLogger => {
  const winstonLogger = createLogger({
    level: config.level,
    format: format.json(),
  });

  switch (config.type) {
    case "local":
      winstonLogger.add(
        new transports.Console({
          handleExceptions: true,
        }),
      );
      break;

    case "aws":
      winstonLogger.add(
        new WinstonCloudwatch({
          awsRegion: config.region,
          logGroupName: `${config.serviceName}-${config.stage}`,
          logStreamName: `${config.version}-${randomUUID()}`,
        }),
      );
      break;
  }

  const loggerHelper =
    <T extends Function>(method: T) =>
    (data: LoggerMessage) =>
      method(data);

  logger = {
    debug: loggerHelper(winstonLogger.debug),
    error: loggerHelper(winstonLogger.error),
    info: loggerHelper(winstonLogger.info),
    silly: loggerHelper(winstonLogger.silly),
    warn: loggerHelper(winstonLogger.warn),
    close: () => winstonLogger.close(),
  };

  return logger;
};

export const getLogger = (): ScytixLogger => {
  if (!logger) {
    throw new Error("Logger is not initialized");
  }

  return logger;
};
