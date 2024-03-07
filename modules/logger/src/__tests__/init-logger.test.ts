jest.mock("winston");
jest.mock("winston-cloudwatch");

import {
  format,
  Logger,
  createLogger,
  transports,
  LoggerOptions,
  level,
} from "winston";
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from "jest-when";
import {
  ConsoleTransportOptions,
  Transports,
} from "winston/lib/winston/transports";

import { initLogger, LoggerConfig } from "..";

describe("initLogger", () => {
  const localConfig: LoggerConfig = {
    type: "local",
    level: "debug",
  };

  const awsConfig: LoggerConfig = {
    type: "aws",
    level: "debug",
    region: "us-east-1",
    serviceName: "test-service",
    stage: "dev",
    version: "1.0",
  };

  const mockedAddCommand = jest.fn();

  const winstonLogger = {
    add: mockedAddCommand,
  } as unknown as Logger;

  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("Should initialize local logger", () => {
    const options = {} as ConsoleTransportOptions;
    const transport = {} as Transports;

    const jsonFormatMock = jest.fn(() => ({
      transform: jest.fn(),
    }));

    format.json = jsonFormatMock;

    const createLoggerOptions = {
      level: "debug",
      format: format.json,
    } as unknown as LoggerOptions;

    when(createLogger as jest.Mock)
      .calledWith(createLoggerOptions)
      .mockReturnValue(winstonLogger);

    (transports.Console as any) = jest.fn();

    when(transport.Console as unknown as jest.Mock)
      .expectCalledWith(options)
      .mockReturnValue(transport);
    when(winstonLogger.add)
      .expectCalledWith(expect.any(transport))
      .mockReturnValue(winstonLogger);

    expect(initLogger(localConfig)).toEqual(winstonLogger);
  });
});
