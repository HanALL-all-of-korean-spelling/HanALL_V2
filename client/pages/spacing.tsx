import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getSpacingList } from "../src/services/user-service";
import { useAppSelector } from "../src/_app/hooks";
import { getTest } from "../src/_reducer/testReducer";
import { IPageList } from "../types";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";
import { Title } from "../src/component/Title/Title";
import { PaginationView } from "../src/component/PaginationView/PaginationView";
import { SearchBar } from "../src/component/SearchPage/SearchBar";

const Spacing: NextPage = () => {
  const [spacings, setSpacings] = useState<IPageList>();
  const [sort, setSort] = useState<string>("created_at");
  const page = useAppSelector(getTest).page;

  const getData = async () => {
    const list = await getSpacingList(sort, page);
    setSpacings(list);
  };

  useEffect(() => {
    getData();
  }, [sort, page]);

  const selectSort = () => {
    return (
      <>
        <style jsx>{`
          div {
            display: flex;
            margin: 5px;
          }
        `}</style>
        <div>
          <div
            onClick={() => setSort("created_at")}
            style={
              sort == "created_at"
                ? { fontWeight: "bold" }
                : { fontWeight: "normal" }
            }
          >
            최신순
          </div>
          <div>&nbsp;|</div>
          <div
            onClick={() => setSort("hits")}
            style={
              sort == "hits" ? { fontWeight: "bold" } : { fontWeight: "normal" }
            }
          >
            조회수순
          </div>
          <div>&nbsp;|</div>
          <div
            onClick={() => setSort("scraps")}
            style={
              sort == "scraps"
                ? { fontWeight: "bold" }
                : { fontWeight: "normal" }
            }
          >
            스크랩순
          </div>
        </div>
      </>
    );
  };

  return (
    <div>
      <SearchBar />
      <Title>띄어쓰기 정보</Title>
      {selectSort()}
      {spacings && (
        <>
          <InfoListPage list={spacings.result} type={sort} />
          <PaginationView total={spacings.total_page} current={page} />
        </>
      )}
    </div>
  );
};

export default Spacing;
