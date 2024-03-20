import { Create, SimpleForm, BooleanInput, TextInput } from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

export const JobCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" sx={{ alignSelf: "flex-end" }} />
      <RichTextInput
        source="description"
        fullWidth
        sx={{
          wordBreak: "break-word",
          "& .RaRichTextInput-editorContent": {
            minHeight: "200px",
            maxHeight: "400px",
            overflowY: "auto",
          },
        }}
        label="Description"
      />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Create>
);
