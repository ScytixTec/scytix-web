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

export const createUrn = (resource: UrnResourceValue, id: string): string => {
  return `urn:${urnNId}:${resource}:${id}`;
};

export const getUrnResource = (urn: string): UrnResourceValue | undefined =>
  parseUrn(urn)?.resource;

export const getUrnId = (urn: string): string | undefined => parseUrn(urn)?.id;
