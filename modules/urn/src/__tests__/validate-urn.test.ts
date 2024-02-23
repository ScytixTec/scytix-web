import { resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { validateUrn } from "../index";

describe("test validateUrn function ", () => {
  const urn = "urn:scytix:ARTICLE:123456789012";
  const resource = "ARTICLE";
  beforeEach(() => {
    const UrnResource = {
      ARTICLE: "ARTICLE",
      PAGE: "PAGE",
    };
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should returns true for supported resource", () => {
    expect(validateUrn(urn, resource)).toEqual(true);
  });

  it("should return undefined if Id is missing", () => {
    const resource = "SOMETHING";
    expect(validateUrn(urn, resource)).toEqual(false);
  });
});