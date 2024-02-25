import { validateUrn, UrnResource, UrnResourceValue } from "../index";

describe("test validateUrn function ", () => {
  const mappedUrns = Object.values(UrnResource).map((x) => [
    `urn:scytix:${x}:123456789012`,
    x,
  ]);

  test.each(mappedUrns)(
    "should return true for supported resources",
    (urn, resource) => {
      expect(validateUrn(urn, resource as UrnResourceValue)).toEqual(true);
    },
  );

  it("should return false for unsupported resource", () => {
    const urn = "urn:scytix:ARTICLE:123456789012";
    const resource = "PROJECT";
    expect(validateUrn(urn, resource)).toEqual(false);
  });

  it("should return false for unsupported urns", () => {
    const urn = "urn:scytix";
    const resource = "JOB";
    expect(validateUrn(urn, resource)).toEqual(false);
  });
});
