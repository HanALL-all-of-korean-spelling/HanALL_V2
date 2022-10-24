import type { GetServerSideProps, NextPage } from "next";
import { getSpacingList } from "../src/services/user-service";
import { IPageList } from "../types";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";

const Spacing: NextPage<{ spacings: IPageList }> = ({ spacings }) => {
  return <InfoListPage data={spacings} typeTitle="띄어쓰기" />;
};

export default Spacing;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query?.page as string;
  const sort = context.query?.sort as string;
  const spacings = await getSpacingList(sort, +page);
  return {
    props: {
      spacings,
    },
  };
};
