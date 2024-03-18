import { useListContext } from "react-admin";
import { Button, Toolbar } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";

export const Pagination = () => {
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
