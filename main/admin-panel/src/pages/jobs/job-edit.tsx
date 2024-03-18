import { SimpleForm, BooleanInput, TextInput, Edit } from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

export const JobEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="title" />
      <RichTextInput source="description" />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Edit>
);
