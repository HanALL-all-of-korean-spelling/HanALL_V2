import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import {
  getSpacingList,
  getSpellingDetail,
  getSpellingList,
} from "../../src/services/user-service";
import { IDetail, IPageList } from "../../types";
import { DetailPage } from "../../src/component/DetailPage/DetailPage";

const Detail: NextPage<{ detailInfo: IDetail }> = ({ detailInfo }) => {
  return <DetailPage detailInfo={detailInfo} />;
};

export default Detail;

export const getStaticPaths: GetStaticPaths = async () => {
  const spacings: IPageList = await getSpacingList("created_at", 1);
  const spellings: IPageList = await getSpellingList("created_at", 1);

  const spacingPaths = spacings.result.map((spacing) => ({
    params: { id: spacing._id },
  }));
  const spellingPaths = spellings.result.map((spelling) => ({
    params: { id: spelling._id },
  }));

  return {
    paths: [...spacingPaths, ...spellingPaths],
    fallback: true, // build때 만들어지지 않은 path도 추후 요청 들어오면 만들 것
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const detailInfo = await getSpellingDetail(id);
  return {
    props: {
      detailInfo,
    },
  };
};
