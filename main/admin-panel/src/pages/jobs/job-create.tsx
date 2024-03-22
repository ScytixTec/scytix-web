import { Create, SimpleForm, BooleanInput, TextInput } from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

export function JobCreate(): JSX.Element {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" sx={{ alignSelf: "flex-end" }} />
        <RichTextInput
          source="description"
          fullWidth
          sx={{
            wordBreak: "break-word",
            "& .tiptap.ProseMirror": {
              minHeight: "100px",
              maxHeight: "300px",
              overflowY: "auto",
            },
          }}
          label="Description"
        />
        <BooleanInput source="isActive" label="Active" />
      </SimpleForm>
    </Create>
  );
}
