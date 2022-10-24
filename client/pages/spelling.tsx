import type { GetServerSideProps, NextPage } from "next";
import { getSpellingList } from "../src/services/user-service";
import { IPageList } from "../types";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";

const Spelling: NextPage<{ spellings: IPageList }> = ({ spellings }) => {
  return <InfoListPage data={spellings} typeTitle="철자" />;
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
