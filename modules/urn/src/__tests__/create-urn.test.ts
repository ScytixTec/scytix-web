import {
  createUrn,
  UrnResource,
  urnNId,
  UrnComponent,
  type ScytixUrn,
} from "..";

describe("test createUrn function ", () => {
  const uuid = "36b8f84d-df4e-4d49-b662-bcde71a8764f";

  test.each(Object.values(UrnResource))(
    "creates valid urn with the given resource",
    (resource) => {
      const result = createUrn({
        resource,
      });
      expect(result).toEqual(`urn:${urnNId}:${resource.toLowerCase()}`);
    },
  );

  it("creates urn with resource and id", () => {
    expect(
      createUrn({
        resource: UrnResource.ARTICLE,
        id: uuid,
      }),
    ).toEqual(`urn:scytix:article:${uuid}`);
  });

  it("creates urn with resource component and component id", () => {
    expect(
      createUrn({
        resource: UrnResource.ARTICLE,
        id: uuid,
        component: UrnComponent.APPLICATION,
        componentId: uuid,
      }),
    ).toEqual(`urn:scytix:article:${uuid}#application:${uuid}`);
  });

  it("throws error if there is id but missing resource", () => {
    expect(() =>
      createUrn({
        id: uuid,
      } as ScytixUrn),
    ).toThrow("Invalid URN");
  });

  it("throws error if there is id but missing resource", () => {
    expect(() =>
      createUrn({
        resource: UrnResource.ARTICLE,
        id: uuid,
        component: UrnComponent.APPLICATION,
      }),
    ).toThrow("Invalid URN");
  });

  it("throws error if id is invalid uuid", () => {
    expect(() =>
      createUrn({
        resource: UrnResource.ARTICLE,
        id: "INVALID_UUID",
      }),
    ).toThrow("Id must be uuid v4");
  });

  it("throws error if componentId is invalid uuid", () => {
    expect(() =>
      createUrn({
        resource: UrnResource.ARTICLE,
        id: uuid,
        component: UrnComponent.APPLICATION,
        componentId: "INVALID_UUID",
      }),
    ).toThrow("Id must be uuid v4");
  });
});
