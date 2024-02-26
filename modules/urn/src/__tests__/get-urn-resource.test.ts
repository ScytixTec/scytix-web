import { UrnResource, getUrnResource } from "../index";

describe("test getUrnResource function ", () => {
  const mappedUrns = Object.values(UrnResource).map((resource) => [
    `urn:scytix:${resource}:123456789012`,
    resource,
  ]);

  test.each(mappedUrns)(
    "should return the resource for supported urns",
    (urn, resource) => {
      expect(getUrnResource(urn)).toEqual(resource);
    },
  );

  it("should return undefined if Id is missing", () => {
    const urn = "urn:scytix:ARTICLE:";
    expect(getUrnResource(urn)).toEqual(undefined);
  });

  it("should return undefined if resource is missing", () => {
    const urn = "urn:scytix::123";
    expect(getUrnResource(urn)).toEqual(undefined);
  });
});
