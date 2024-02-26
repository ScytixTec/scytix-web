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
 * @returns boolean. If the URN is successfully parsed and a `resource` value is provided
 * returns true. If no `resource` value is provided or the parsed resource is undefined,
 * returns false.
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
 */
export const createUrn = (resource: UrnResourceValue, id: string): string => {
  return `urn:${urnNId}:${resource}:${id}`;
};

/**
 * The function `getUrnResource` extracts the resource value from a URN string using the `parseUrn`
 * function in TypeScript.
 */
export const getUrnResource = (urn: string): UrnResourceValue | undefined =>
  parseUrn(urn)?.resource;

/**
 * The function `getUrnId` takes a URN string as input and returns the ID part of the URN if it can be
 * parsed.
 */
export const getUrnId = (urn: string): string | undefined => parseUrn(urn)?.id;
