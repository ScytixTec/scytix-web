export type ValidateUrnType = (urn: string, resource: string) => Boolean;
export type CreateUrnType = (resource: string, id: string | number) => void;
export type GetUrnResourceType = (urn: string) => string | null;
export type GetUrnRIdType = (urn: string) => string | undefined;
