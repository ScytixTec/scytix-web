import {
  BooleanField,
  DateField,
  RichTextField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

export function JobShow(): JSX.Element {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="sk" />
        <RichTextField source="description" />
        <TextField source="pk" />
        <TextField source="id" />
        <BooleanField source="isActive" />
        <TextField source="title" />
        <DateField source="dateAdded" />
        <DateField source="dateUpdated" />
      </SimpleShowLayout>
    </Show>
  );
}
