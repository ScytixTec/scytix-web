import { resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getUrnId } from "../index";

describe("test getUrnId function ", () => {
  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should returns the id", () => {
    const urn = "urn:scytix:ARTICLE:123456789012";
    expect(getUrnId(urn)).toEqual("123456789012");
  });

  it("should return undefined if Id is missing", () => {
    const urn = "urn:scytix:ARTICLE:";
    expect(getUrnId(urn)).toEqual(undefined);
  });
});
