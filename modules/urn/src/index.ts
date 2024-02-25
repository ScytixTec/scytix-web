const urnNId = "scytix";

export const UrnResource = {
  ARTICLE: "ARTICLE",
  PAGE: "PAGE",
  TESTIMONIAL: "TESTIMONIAL",
  PROJECT: "PROJECT",
  JOB: "JOB",
} as const;

type UrnResourceValue = (typeof UrnResource)[keyof typeof UrnResource];

export const validateUrn = (
  urn: string,
  resource: UrnResourceValue,
): boolean => {
  if (UrnResource.hasOwnProperty(resource)) {
    const pattern = new RegExp(`^urn:${urnNId}:${resource}:[a-zA-Z0-9_-]+$`);
    return pattern.test(urn);
  }

  return false;
};

export const createUrn = (resource: UrnResourceValue, id: string): string => {
  return `urn:scytix:${resource}:${id}`;
};

export const getUrnResource = (urn: string): UrnResourceValue | undefined => {
  const urnResource = urn.split(":")[2] as UrnResourceValue;

  if (urnResource) {
    if (validateUrn(urn, urnResource)) {
      return urnResource;
    }
  }
};

export const getUrnId = (urn: string): string | undefined => {
  const urnId = urn.split(":")[3];
  if (urnId) {
    return urnId;
  }
};
