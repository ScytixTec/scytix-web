import { type RaRecord, useRecordContext } from "react-admin";

export function Title<T extends RaRecord>({
  description,
}: {
  description: string;
}): JSX.Element {
  const record = useRecordContext<T>();
  return <>{`${description} ${record.title}`}</>;
}
