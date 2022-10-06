import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";

export const PaginationView = ({
  total,
  current,
  sort,
}: {
  total: number;
  current: number;
  sort: string;
}) => {
  const router = useRouter();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.push({
      query: { page: value, sort: sort },
    });
  };

  return (
    <div>
      <Pagination
        count={total}
        page={current}
        onChange={handleChange}
        style={style}
      />
    </div>
  );
};

const style = {
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
};
