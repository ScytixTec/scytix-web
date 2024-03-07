jest.mock("winston", () => ({
  ...jest.requireActual("winston"),
  createLogger: jest.fn(),
  format: {
    json: jest.fn(),
  },
  transports: {
    Console: jest.fn(),
  },
}));
jest.mock("winston-cloudwatch");

import { format, createLogger, transports, Logger } from "winston";
import { resetAllWhenMocks, verifyAllWhenMocksCalled, when } from "jest-when";

import { initLogger, LoggerConfig } from "..";

describe("initLogger", () => {
  const logLevel = "debug";
  const mockedAddCommand = jest.fn();

  const winstonLogger = {
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
      debug: expect.any(Function),
      error: expect.any(Function),
      info: expect.any(Function),
      silly: expect.any(Function),
      warn: expect.any(Function),
      close: expect.any(Function),
    });
  });
});
