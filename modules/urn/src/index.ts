import {
  ValidateUrnType,
  CreateUrnType,
  GetUrnResourceType,
  GetUrnRIdType,
} from "./types";

export const UrnResource = {
  ARTICLE: "ARTICLE",
  PAGE: "PAGE",
  TESTIMONIAL: "TESTIMONIAL",
  PROJECT: "PROJECT",
  JOB: "JOB",
};

export const validateUrn: ValidateUrnType = (urn, resource) => {
  const UrnResource = urn.split(":")[2];
  const UrnId = urn.split(":")[3];

  if (UrnResource === resource && UrnId) {
    return true;
  }

  return false;
};

export const createUrn: CreateUrnType = (resource, id) => {};

export const getUrnResource: GetUrnResourceType = (urn) => {
  const UrnResource = urn.split(":")[2];

  if (UrnResource) {
    return UrnResource;
  }
  return null;
};

export const getUrnId: GetUrnRIdType = (urn) => {
  const UrnId = urn.split(":")[3];

  if (UrnId) {
    return UrnId;
  }

  return undefined;
};
