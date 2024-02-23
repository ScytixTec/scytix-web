export const UrnResource = {
  ARTICLE: "ARTICLE",
  PAGE: "PAGE",
  TESTIMONIAL: "TESTIMONIAL",
  PROJECT: "PROJECT",
  JOB: "JOB",
};

export const validateUrn = (urn: string, resource: string): Boolean => {
  if (UrnResource.hasOwnProperty(resource)) {
    const pattern = new RegExp(`${resource}:[a-zA-Z0-9_-]+`);
    return pattern.test(urn);
  }

  return false;
};

export const createUrn = (resource: string, id: string): undefined => {};

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
