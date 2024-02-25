import { createUrn, UrnResource, urnNId } from "..";

describe("test createUrn function ", () => {
  const id = "12421412";

  test.each(Object.values(UrnResource))(
    "creates valid urn with the given resource and id",
    (firstArgument) => {
      const result = createUrn(firstArgument, id);
      expect(result).toEqual(`urn:${urnNId}:${firstArgument}:${id}`);
    },
  );
});
