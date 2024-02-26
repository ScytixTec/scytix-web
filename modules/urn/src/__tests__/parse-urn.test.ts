import { UrnResource, parseUrn } from "..";

describe("test parseUrn function", () => {
  test.each(Object.values(UrnResource))(
    "should return the right object for valid urns with all possible resources",
    (resource) => {
      const urn = `urn:scytix:${resource}:123`;
      expect(parseUrn(urn)).toEqual({
        resource,
        id: "123",
      });
    },
  );
  it("should return undefined for unsupported resource", () => {
    const urn = "urn:scytix:SOMETHING:123";
    expect(parseUrn(urn)).toEqual(undefined);
  });

  it("should return undefined for missing ids", () => {
    const urn = "urn:scytix:JOB:";
    expect(parseUrn(urn)).toEqual(undefined);
  });

  it("should return undefined for wrong urnNID", () => {
    const urn = "urn:wrong:JOB:123";
    expect(parseUrn(urn)).toEqual(undefined);
  });
});
