import { SimpleForm, BooleanInput, TextInput, Edit } from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

export const JobEdit = () => (
  <Edit mutationMode="pessimistic">
    <SimpleForm>
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
