export type ValidateUrnType = (urn: string, resource: string) => Boolean;
export type CreateUrnType = (resource: string, id: string) => void;
export type GetUrnResourceType = (urn: string) => string | undefined;
export type GetUrnRIdType = (urn: string) => string | undefined;
