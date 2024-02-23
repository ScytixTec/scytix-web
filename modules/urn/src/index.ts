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
): Boolean => {
  if (UrnResource.hasOwnProperty(resource)) {
    const pattern = new RegExp(`^urn:${urnNId}:${resource}:[a-zA-Z0-9_-]+$`);
    return pattern.test(urn);
  }

  return false;
};

export const createUrn = (
  resource: UrnResourceValue,
  id: string,
): undefined => {};

export const getUrnResource = (urn: string): string | undefined => {
  const UrnResource = urn.split(":")[2];

  if (UrnResource) {
    return UrnResource;
  }
};

export const getUrnId = (urn: string): string | undefined => {
  const UrnId = urn.split(":")[3];
  if (UrnId) {
    return UrnId;
  }
};
