import { getLogger, type LoggerConfig, initLogger } from "..";

describe("GetLogger", () => {
  const logLevel = "debug";

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Returns error when no logger is defined", () => {
    expect(() => getLogger()).toThrow("Logger is not initialized");
  });
  it("Returns logger when Logger is defined", () => {
    const localConfig: LoggerConfig = {
      type: "local",
      level: logLevel,
    };
    const logger = initLogger(localConfig);

    expect(getLogger()).toEqual(logger);
  });
});
