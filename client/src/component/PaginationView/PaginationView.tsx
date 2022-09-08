import { useAppDispatch } from "../../_app/hooks";
import { setPage } from "../../_reducer/testReducer";
import Pagination from "@mui/material/Pagination";

export const PaginationView = ({
  total,
  current,
}: {
  total: number;
  current: number;
}) => {
  const dispatch = useAppDispatch();
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
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
