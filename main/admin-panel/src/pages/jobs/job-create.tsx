import { Create, SimpleForm, BooleanInput, TextInput } from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

export const JobCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <RichTextInput source="description" />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Create>
);
