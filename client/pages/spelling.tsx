import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getSpellingList } from "../src/services/user-service";
import { IPageList } from "../types";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";
import { Title } from "../src/component/common/Title/Title";
import { PaginationView } from "../src/component/common/PaginationView/PaginationView";
import { SearchBar } from "../src/component/SearchPage/SearchBar";
import { SelectSort } from "../src/component/common/SelectSort/SelectSort";

const Spelling: NextPage<{ spellings: IPageList }> = ({ spellings }) => {
  const router = useRouter();
  const page = router.query.page as string;
  const sort = router.query.sort as string;

  return (
    <div>
      <SearchBar />
      <Title>철자 정보</Title>
      {spellings && (
        <>
          <SelectSort sort={sort} page={+page} />
          <InfoListPage list={spellings.result} type={sort} />
          <PaginationView
            total={spellings.total_page}
            current={+page}
            sort={sort}
          />
        </>
      )}
    </div>
  );
};

export default Spelling;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query?.page as string;
  const sort = context.query?.sort as string;
  const spellings = await getSpellingList(sort, +page);
  return {
    props: {
      spellings,
    },
  };
};
