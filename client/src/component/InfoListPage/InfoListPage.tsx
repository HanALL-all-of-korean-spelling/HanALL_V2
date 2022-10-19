import { useRouter } from "next/router";
import { IPageList } from "../../../types";
import { PaginationView } from "../common/PaginationView/PaginationView";
import { SelectSort } from "../common/SelectSort/SelectSort";
import { Title } from "../common/Title/Title";
import { SearchBar } from "../SearchPage/SearchBar";
import { InfoList } from "./InfoList";
import style from "./InfoListPage.module.scss";

export const InfoListPage = ({
  data,
  typeTitle,
}: {
  data: IPageList;
  typeTitle: string;
}) => {
  const router = useRouter();
  const page = router.query.page as string;
  const sort = router.query.sort as string;
  return (
    <div className={style.InfoListPage}>
      <SearchBar />
      <Title>{typeTitle} 정보</Title>
      {data && (
        <>
          <SelectSort sort={sort} page={+page} />
          <InfoList list={data.result} type={sort} />
          <PaginationView total={data.total_page} current={+page} sort={sort} />
        </>
      )}
    </div>
  );
};
