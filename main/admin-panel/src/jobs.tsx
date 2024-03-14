import {
  List,
  Datagrid,
  EditButton,
  Create,
  SimpleForm,
  BooleanInput,
  TextInput,
  Edit,
  useListContext,
  Show,
  SimpleShowLayout,
  RichTextField,
  TextField,
  BooleanField,
  DateField,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { Button, Toolbar } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

const JobPagination = () => {
  const { page, hasPreviousPage, hasNextPage, setPage } = useListContext();
  if (!hasPreviousPage && !hasNextPage) return null;
  return (
    <Toolbar>
      {hasPreviousPage && (
        <Button
          key="previous"
          onClick={() => setPage(page - 1)}
          startIcon={<ChevronLeft />}
        >
          Previous
        </Button>
      )}
      {hasNextPage && (
        <Button
          key="next"
          onClick={() => setPage(page + 1)}
          startIcon={<ChevronRight />}
        >
          Next
        </Button>
      )}
    </Toolbar>
  );
};

export const JobList = () => (
  <List pagination={<JobPagination />}>
    <Datagrid rowClick="show">
      <TextField source="title" />
      <TextField source="dateAdded" />
      <TextField source="dateUpdated" />
      <TextField source="isActive" />
      <EditButton />
    </Datagrid>
  </List>
);

export const JobCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" />
      <RichTextInput source="description" />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Create>
);

export const JobEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" InputProps={{ disabled: true }} />
      <TextInput source="title" />
      <TextInput source="description" multiline rows={5} />
      <BooleanInput source="isActive" label="Active" />
    </SimpleForm>
  </Edit>
);
