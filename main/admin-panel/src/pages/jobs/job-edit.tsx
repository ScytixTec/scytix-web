import {
  SimpleForm,
  BooleanInput,
  TextInput,
  Edit,
  Toolbar,
  SaveButton,
  useRecordContext,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

import { type Job } from "./job-list";

function CustomToolbar(): JSX.Element {
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <SaveButton />
    </Toolbar>
  );
}

function PageTitle(): JSX.Element {
  const record = useRecordContext<Job>();
  return <>Edit Job {record.title}</>;
}

export function JobEdit(): JSX.Element {
  return (
    <Edit mutationMode="pessimistic" title={<PageTitle />}>
      <SimpleForm toolbar={<CustomToolbar />}>
        <TextInput
          source="id"
          InputProps={{ disabled: true }}
          sx={{ alignSelf: "flex-end" }}
        />
        <TextInput source="title" sx={{ alignSelf: "flex-end" }} />
        <RichTextInput
          source="description"
          fullWidth
          sx={{
            wordBreak: "break-word",
          }}
        />
        <BooleanInput source="isActive" label="Active" />
      </SimpleForm>
    </Edit>
  );
}
