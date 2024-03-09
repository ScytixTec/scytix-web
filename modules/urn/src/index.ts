export const urnNId = "scytix";

export const UrnResource = {
  ARTICLE: "ARTICLE",
  PAGE: "PAGE",
  TESTIMONIAL: "TESTIMONIAL",
  PROJECT: "PROJECT",
  JOB: "JOB",
  APPLICATION: "APPLICATION",
} as const;

export type UrnResourceValue = (typeof UrnResource)[keyof typeof UrnResource];

export interface ScytixUrn {
  resource: UrnResourceValue;
  id?: string;
  componentId?: string;
}

const uuid4Format = String.raw`[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}`;
const uuid4Regex = new RegExp(`^${uuid4Format}$`, "i");
const resourceRegex = String.raw`(?<resource>${Object.values(UrnResource).join("|")})`;
const idRegex = String.raw`(?<id>${uuid4Format})`;
const componentIdRegex = String.raw`(?<componentId>${uuid4Format})`;

const urnRegex = new RegExp(
  [
    `^`,
    `urn:scytix:`,
    resourceRegex,
    `(`,
    `:${idRegex}`,
    `(`,
    `#${componentIdRegex}`,
    `)?`,
    `)?`,
    `$`,
  ].join(""),
  "i",
);

export const parseUrn = (urn: string): ScytixUrn | undefined => {
  const parsed = urnRegex.exec(urn);

  if (parsed?.groups) {
    const { resource, id, componentId } = parsed.groups;

    return {
      resource: resource.toUpperCase() as UrnResourceValue,
      id,
      componentId,
    };
  }
};

export const createUrn = ({ resource, id, componentId }: ScytixUrn): string => {
  if ((id && !resource) || (componentId && !id)) {
    throw Error("Invalid URN");
  }

  if (
    (id && !uuid4Regex.test(id)) ||
    (componentId && !uuid4Regex.test(componentId))
  ) {
    throw Error("Id must be uuid v4");
  }

  const urn = [`urn:${urnNId}:${resource.toLowerCase()}`];

  if (id) {
    urn.push(`:${id}`);
  }

  if (componentId) {
    urn.push(`#${componentId}`);
  }

  return urn.join("");
};
