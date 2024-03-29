import { randomUUID } from "node:crypto";
import { format, createLogger, transports, type Logger } from "winston";
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from "jest-when";
import WinstonCloudwatch from "winston-cloudwatch";

import { initLogger, type ScytixLogger, type LoggerConfig } from "..";

jest.mock(
  "winston",
  () =>
    ({
      ...jest.requireActual("winston"),
      createLogger: jest.fn(),
      format: {
        json: jest.fn(),
      },
      transports: {
        Console: jest.fn(),
      },
    }) as ReturnType<typeof jest.mock>,
);
jest.mock("winston-cloudwatch");
jest.mock("node:crypto");

describe("initLogger", () => {
  const logLevel = "debug";
  const mockedAddCommand = jest.fn();

  const winstonLogger = {
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    silly: jest.fn(),
    warn: jest.fn(),
    add: mockedAddCommand,
  } as unknown as Logger;

  beforeEach(() => {
    resetAllWhenMocks();
    jest.resetAllMocks();

    when(createLogger)
      .calledWith({
        level: logLevel,
        format: format.json(),
      })
      .mockReturnValue(winstonLogger);
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
    jest.clearAllMocks();
  });

  it("Should initialize local logger", () => {
    const localConfig: LoggerConfig = {
      type: "local",
      level: logLevel,
    };

    when(transports.Console as unknown as jest.Mock)
      .expectCalledWith({
        handleExceptions: true,
      })
      .mockReturnValue({});

    when(mockedAddCommand).expectCalledWith({}).mockReturnValue(undefined);
    expect(initLogger(localConfig)).toEqual({
      debug: expect.any(Function) as ScytixLogger["debug"],
      error: expect.any(Function) as ScytixLogger["error"],
      info: expect.any(Function) as ScytixLogger["info"],
      silly: expect.any(Function) as ScytixLogger["silly"],
      warn: expect.any(Function) as ScytixLogger["warn"],
      close: expect.any(Function) as ScytixLogger["close"],
    });
  });

  it("Should initialize aws logger", () => {
    const awsConfig: LoggerConfig = {
      type: "aws",
      level: logLevel,
      region: "us-west-1",
      serviceName: "test",
      stage: "prod",
      version: "1.00",
    };

    when(WinstonCloudwatch as unknown as jest.Mock)
      .expectCalledWith({
        awsRegion: awsConfig.region,
        logGroupName: `${awsConfig.serviceName}-${awsConfig.stage}`,
        logStreamName: `${awsConfig.version}-${randomUUID()}`,
      })
      .mockReturnValue({});

    when(mockedAddCommand).expectCalledWith({}).mockReturnValue(undefined);
    expect(initLogger(awsConfig)).toEqual({
      debug: expect.any(Function) as ScytixLogger["debug"],
      error: expect.any(Function) as ScytixLogger["error"],
      info: expect.any(Function) as ScytixLogger["info"],
      silly: expect.any(Function) as ScytixLogger["silly"],
      warn: expect.any(Function) as ScytixLogger["warn"],
      close: expect.any(Function) as ScytixLogger["close"],
    });
  });
});
