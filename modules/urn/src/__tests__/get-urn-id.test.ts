import { getUrnId, UrnResource } from "../index";

describe("test getUrnId function ", () => {
  test.each(Object.values(UrnResource))(
    "should return the id for different resources",
    (resource) => {
      const urn = `urn:scytix:${resource}:123456789012`;
      expect(getUrnId(urn)).toEqual("123456789012");
    },
  );

  it("should return undefined if Id is missing", () => {
    const urn = "urn:scytix:ARTICLE:";
    expect(getUrnId(urn)).toEqual(undefined);
  });
});
