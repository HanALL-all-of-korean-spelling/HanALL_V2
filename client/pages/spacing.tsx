import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSpacingList } from "../src/services/user-service";
import { IPageList } from "../types";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";

// const Spacing: NextPage<{ spacings: IPageList }> = ({ spacings }) => {
const Spacing: NextPage = () => {
  const router = useRouter();
  const sort = router.query.sort as string;
  const page = router.query.page as string;
  const [spacings, setSpacings] = useState<IPageList>();

  useEffect(() => {
    const getData = async () => {
      const list = await getSpacingList(sort, +page);
      setSpacings(list);
    };
    getData();
  }, [sort, page]);

  return <InfoListPage data={spacings} typeTitle="띄어쓰기" />;
};

export default Spacing;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const page = context.query?.page as string;
//   const sort = context.query?.sort as string;
//   const spacings = await getSpacingList(sort, +page);
//   return {
//     props: {
//       spacings,
//     },
//   };
// };
