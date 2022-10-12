import Link from "next/link";
import Pagination, {
  PaginationRenderItemParams,
} from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

export const PaginationView = ({
  total,
  current,
  sort,
}: {
  total: number;
  current: number;
  sort?: string;
}) => {
  const handleQuery = (
    sort: string | undefined,
    item: PaginationRenderItemParams
  ) => {
    if (sort) return { page: item.page, sort: sort };
    else return { page: item.page };
  };

  return (
    <Pagination
      page={current}
      count={total}
      style={style}
      boundaryCount={0}
      showFirstButton
      showLastButton
      size="small"
      siblingCount={2}
      renderItem={(item) => (
        <Link href={{ query: handleQuery(sort, item) }} passHref>
          <PaginationItem {...item} />
        </Link>
      )}
    />
  );
};

const style = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
};
