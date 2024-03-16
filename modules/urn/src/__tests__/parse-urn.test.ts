import { UrnResource, parseUrn } from "..";

describe("test parseUrn function", () => {
  const uuid = "36b8f84d-df4e-4d49-b662-bcde71a8764f";

  test.each(Object.values(UrnResource))(
    "should return the right object for valid urns with all possible resources",
    (resource) => {
      const urn = `urn:scytix:${resource}`;
      expect(parseUrn(urn)).toEqual({
        resource,
      });
    },
  );

  test.each(Object.values(UrnResource))(
    "should return the right object for valid urns with all possible resources and id",
    (resource) => {
      const urn = `urn:scytix:${resource}:${uuid}`;
      expect(parseUrn(urn)).toEqual({
        resource,
        id: uuid,
      });
    },
  );

  test.each(Object.values(UrnResource))(
    "should return the right object for valid urns with all possible resources, id and componentId",
    (resource) => {
      const urn = `urn:scytix:${resource}:${uuid}#${uuid}`;
      expect(parseUrn(urn)).toEqual({
        resource,
        id: uuid,
        componentId: uuid,
      });
    },
  );

  it("should return undefined for wrong urnNID", () => {
    const urn = `urn:wrong:JOB:${uuid}`;
    expect(parseUrn(urn)).toEqual(undefined);
  });

  it("should return undefined for unsupported resource", () => {
    const urn = `urn:scytix:SOMETHING:${uuid}`;
    expect(parseUrn(urn)).toEqual(undefined);
  });

  it("should return undefined for missing ids", () => {
    const urn = "urn:scytix:JOB:";
    expect(parseUrn(urn)).toEqual(undefined);
  });

  it("should return undefined with invalid id", () => {
    const urn = "urn:scytix:job:INVALID_UUID";

    expect(parseUrn(urn)).toEqual(undefined);
  });

  it("should return undefined if component id is missing", () => {
    const urn = `urn:scytix:job:${uuid}#`;

    expect(parseUrn(urn)).toEqual(undefined);
  });

  it("should return undefined with invalid component id", () => {
    const urn = `urn:scytix:job:${uuid}#INVALID_UUID`;

    expect(parseUrn(urn)).toEqual(undefined);
  });
});
