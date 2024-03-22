import {
  SimpleForm,
  BooleanInput,
  TextInput,
  Edit,
  Toolbar,
  SaveButton,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

import { type Job } from "../../../types";
import { Title } from "../../components/title";

function CustomToolbar(): JSX.Element {
  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <SaveButton />
    </Toolbar>
  );
}

export function JobEdit(): JSX.Element {
  return (
    <Edit mutationMode="pessimistic" title={<Title<Job> description="Edit" />}>
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
