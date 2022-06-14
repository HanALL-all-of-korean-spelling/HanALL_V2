import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";
import { getSpacingList } from "../src/services/user-service";
import { IPageList } from "../types";

const Spacing: NextPage = () => {
  const [spacings, setSpacings] = useState<IPageList>();
  const [sort, setSort] = useState<string>("created_at");

  const getData = async () => {
    const list = await getSpacingList(sort);
    setSpacings(list);
  };

  useEffect(() => {
    getData();
  }, [sort]);

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
    <>
      {selectSort()}
      {spacings && <InfoListPage list={spacings.result} />}
    </>
  );
};

export default Spacing;
