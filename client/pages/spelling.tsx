import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getSpellingList } from "../src/services/user-service";
import { IPageList } from "../types";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";

// const Spelling: NextPage<{ spellings: IPageList }> = ({ spellings }) => {
const Spelling: NextPage = () => {
  const router = useRouter();
  const sort = router.query.sort as string;
  const page = router.query.page as string;
  const [spellings, setSpellings] = useState<IPageList>();

  useEffect(() => {
    const getData = async () => {
      const list = await getSpellingList(sort, +page);
      setSpellings(list);
    };
    getData();
  }, [sort, page]);

  return <InfoListPage data={spellings} typeTitle="철자" />;
};

export default Spelling;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const page = context.query?.page as string;
//   const sort = context.query?.sort as string;
//   const spellings = await getSpellingList(sort, +page);
//   return {
//     props: {
//       spellings,
//     },
//   };
// };
