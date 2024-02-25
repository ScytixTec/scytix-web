export const urnNId = "scytix";

export const UrnResource = {
  ARTICLE: "ARTICLE",
  PAGE: "PAGE",
  TESTIMONIAL: "TESTIMONIAL",
  PROJECT: "PROJECT",
  JOB: "JOB",
} as const;

export type UrnResourceValue = (typeof UrnResource)[keyof typeof UrnResource];

const urnRegex = new RegExp(
  `^urn:scytix:(?<resource>${Object.values(UrnResource).join("|")}):(?<id>[a-zA-Z0-9_-]+)$`,
  "i",
);

interface ParsedUrn {
  resource: UrnResourceValue;
  id: string;
}

/**
 * The function `parseUrn` takes a URN string as input, extracts the resource and id components using a
 * regular expression, and returns them as a ParsedUrn object.
 * @param {string} urn - The `urn` parameter is a string that represents a Uniform Resource Name (URN)
 * that needs to be parsed into its components. The function `parseUrn` takes this URN string as input
 * and attempts to extract the resource and id components from it. If the URN matches a specific
 * pattern
 * @returns The `parseUrn` function is returning an object with `resource` and `id` properties if the
 * `urn` string matches the regex pattern and contains the necessary groups. The `resource` property is
 * converted to uppercase and typed as `UrnResourceValue`. If the `urn` string does not match the
 * pattern or does not contain the necessary groups, `undefined` is returned.
 */
export const parseUrn = (urn: string): ParsedUrn | undefined => {
  const parsed = urnRegex.exec(urn);

  if (parsed?.groups) {
    const { resource, id } = parsed.groups;

    return {
      resource: resource.toUpperCase() as UrnResourceValue,
      id,
    };
  }
};

/**
 * The function `validateUrn` checks if a given URN matches a specified resource value.
 * @param {string} urn - The `urn` parameter is a string representing a Uniform Resource Name (URN). It
 * is used to uniquely identify resources in a consistent manner.
 * @param {UrnResourceValue} [resource] - The `resource` parameter in the `validateUrn` function is an
 * optional parameter of type `UrnResourceValue`. It is used to specify the resource value that the URN
 * should match for the validation to pass. If the `resource` parameter is provided, the function will
 * check if the
 * @returns The `validateUrn` function returns a boolean value. It checks if the provided URN (Uniform
 * Resource Name) is valid by parsing it using the `parseUrn` function. If the URN is successfully
 * parsed and a `resource` value is provided, it checks if the parsed resource matches the provided
 * `resource` value. If no `resource` value is provided or the parsed resource
 */
export const validateUrn = (
  urn: string,
  resource?: UrnResourceValue,
): boolean => {
  const parsed = parseUrn(urn);

  if (parsed) {
    return !resource || resource === parsed.resource;
  }

  return false;
};

/**
 * The function creates a URN (Uniform Resource Name) by combining a resource value and an ID.
 * @param {UrnResourceValue} resource - The `resource` parameter is a value that represents the type of
 * resource for which the URN (Uniform Resource Name) is being created. It could be a specific
 * category, entity, or object that the URN is identifying.
 * @param {string} id - The `id` parameter is a string value that represents the unique identifier of a
 * resource.
 * @returns The function `createUrn` is returning a URN (Uniform Resource Name) string constructed
 * using the input parameters `resource` and `id`. The format of the returned string is
 * `urn:::`.
 */
export const createUrn = (resource: UrnResourceValue, id: string): string => {
  return `urn:${urnNId}:${resource}:${id}`;
};

/**
 * The function `getUrnResource` extracts the resource value from a URN string using the `parseUrn`
 * function in TypeScript.
 * @param {string} urn - The `urn` parameter in the `getUrnResource` function is a string representing
 * a Uniform Resource Name (URN). It is used as input to the function to extract the resource value
 * from the URN.
 */
export const getUrnResource = (urn: string): UrnResourceValue | undefined =>
  parseUrn(urn)?.resource;

/**
 * The function `getUrnId` takes a URN string as input and returns the ID part of the URN if it can be
 * parsed.
 * @param {string} urn - The `urn` parameter is a string representing a Uniform Resource Name (URN)
 * that will be used as input for the `getUrnId` function.
 */
export const getUrnId = (urn: string): string | undefined => parseUrn(urn)?.id;
