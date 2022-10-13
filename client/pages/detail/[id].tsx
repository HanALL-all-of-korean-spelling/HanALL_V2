import type { GetServerSideProps, NextPage } from "next";
import { getSpellingDetail } from "../../src/services/user-service";
import { IDetail } from "../../types";
import { DetailPage } from "../../src/component/DetailPage/DetailPage";

const Detail: NextPage<{ detailInfo: IDetail }> = ({ detailInfo }) => {
  return <DetailPage detailInfo={detailInfo} />;
};

export default Detail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id as string;
  const detailInfo = await getSpellingDetail(id);
  return {
    props: {
      detailInfo,
    },
  };
};
