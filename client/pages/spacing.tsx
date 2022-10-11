import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { getSpacingList } from "../src/services/user-service";
import { IPageList } from "../types";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";
import { Title } from "../src/component/Title/Title";
import { PaginationView } from "../src/component/PaginationView/PaginationView";
import { SearchBar } from "../src/component/SearchPage/SearchBar";
import { SelectSort } from "../src/component/SelectSort/SelectSort";

const Spacing: NextPage<{ spacings: IPageList }> = ({ spacings }) => {
  const router = useRouter();
  const page = router.query.page as string;
  const sort = router.query.sort as string;

  return (
    <div>
      <SearchBar />
      <Title>띄어쓰기 정보</Title>
      {spacings && (
        <>
          <SelectSort sort={sort} page={+page} />
          <InfoListPage list={spacings.result} type={sort} />
          <PaginationView
            total={spacings.total_page}
            current={+page}
            sort={sort}
          />
        </>
      )}
    </div>
  );
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
