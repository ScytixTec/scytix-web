import { getLogger } from "..";

describe("GetLogger", () => {
  it("Returns logger when Logger is defined", () => {
    //Should initialize logger to test it
  });

  it("Returns error when no logger is defined", () => {
    expect(() => getLogger()).toThrow("Logger is not initialized");
  });
});
