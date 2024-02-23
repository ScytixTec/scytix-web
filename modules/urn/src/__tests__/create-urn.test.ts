import { resetAllWhenMocks, verifyAllWhenMocksCalled } from "jest-when";

import { createUrn } from "..";

describe("test createUrn function ", () => {
  const resource = "ARTICLE";
  const id = "12421412";
  beforeEach(() => {
    resetAllWhenMocks();
  });

  afterEach(() => {
    verifyAllWhenMocksCalled();
  });

  it("should returns undefined", () => {
    expect(createUrn(resource, id)).toEqual(undefined);
  });
});
