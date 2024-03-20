import { List, Datagrid, EditButton, TextField } from "react-admin";

import { Pagination } from "../../components/pagination";

export function JobList(): JSX.Element {
  return (
    <List pagination={<Pagination />}>
      <Datagrid rowClick="show">
        <TextField source="title" />
        <TextField source="dateAdded" />
        <TextField source="dateUpdated" />
        <TextField source="isActive" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
