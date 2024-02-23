import { when, resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { validateUrn, getUrnId, getUrnResource, createUrn } from "../index";

describe("test all lib functions ", () => {
  const urn = "urn:scytix:ARTICLE:123456789012";
  const resource = "ARTICLE";
  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  describe("test the validateUrn function", () => {
    it("should return true if resource is valid ");

    when(validateUrn).calledWith(urn, resource).mockReturnValue(true);
    expect(validateUrn).toEqual(true);
  });
});
