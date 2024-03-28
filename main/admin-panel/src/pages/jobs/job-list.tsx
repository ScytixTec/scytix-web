import {
  Datagrid,
  EditButton,
  TextField,
  InfiniteList,
  useInfinitePaginationContext,
  DeleteButton,
} from "react-admin";
import { Box, Button } from "@mui/material";

import { type Job } from "../../../types";
import { Title } from "../../components/title";

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
          confirmTitle={<Title<Job> description="Delete" />}
        />
      </Datagrid>
    </InfiniteList>
  );
}
