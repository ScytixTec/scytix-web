import {
  Datagrid,
  EditButton,
  TextField,
  InfiniteList,
  useInfinitePaginationContext,
  DeleteButton,
  useRecordContext,
} from "react-admin";
import { Box, Button } from "@mui/material";

export interface Job {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  timeCreated: string;
  timeUpdated: string;
}

function LoadMore(): JSX.Element | null {
  const { hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitePaginationContext();
  return hasNextPage ? (
    <Box mt={1} textAlign="center">
      <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
        Load more
      </Button>
    </Box>
  ) : null;
}

function DeleteTitle(): JSX.Element {
  const record = useRecordContext<Job>();
  return <>Delete Job: {record.title}</>;
}

export function JobList(): JSX.Element {
  return (
    <InfiniteList pagination={<LoadMore />}>
      <Datagrid rowClick="show">
        <TextField source="title" />
        <TextField source="dateAdded" />
        <TextField source="dateUpdated" />
        <TextField source="isActive" />
        <EditButton />
        <DeleteButton
          mutationMode="pessimistic"
          confirmTitle={<DeleteTitle />}
        />
      </Datagrid>
    </InfiniteList>
  );
}
