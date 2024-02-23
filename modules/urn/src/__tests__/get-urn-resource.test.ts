import { resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { getUrnResource } from "../index";

describe("test getUrnResource function ", () => {
  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should returns the resource for supported urn", () => {
    const urn = "urn:scytix:ARTICLE:123456789012";
    expect(getUrnResource(urn)).toEqual("ARTICLE");
  });

  it("should return undefined if Id is missing", () => {
    const urn = "urn:scytix";
    expect(getUrnResource(urn)).toEqual(undefined);
  });
});
