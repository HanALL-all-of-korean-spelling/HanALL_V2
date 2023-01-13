import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSpellingDetail } from "../../src/services/user-service";
import { IDetail } from "../../types";
import { DetailPage } from "../../src/component/DetailPage/DetailPage";

// const Detail: NextPage<{ detailInfo: IDetail }> = ({ detailInfo }) => {
const Detail: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [detailInfo, setDetailInfo] = useState<IDetail>();

  useEffect(() => {
    const getData = async () => {
      const detail = await getSpellingDetail(id);
      setDetailInfo(detail);
    };
    getData();
  }, [id]);

  return <DetailPage detailInfo={detailInfo} />;
};

export default Detail;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const id = context.params?.id as string;
//   const detailInfo = await getSpellingDetail(id);
//   return {
//     props: {
//       detailInfo,
//     },
//   };
// };
