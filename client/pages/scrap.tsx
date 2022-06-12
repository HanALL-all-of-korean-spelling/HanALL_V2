import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IScrap } from "../types";
import { getScrapList } from "../src/services/auth-service";
import { ScrapList } from "../src/component/ScrapPage/ScrapList";

const Scrap: NextPage = () => {
  const [scraps, setScraps] = useState<IScrap>();
  const getData = async () => {
    const list = await getScrapList();
    setScraps(list);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {scraps && (
        <>
          <div>철자</div>
          <ScrapList scraps={scraps?.spelling} />
          <div>띄어쓰기</div>
          <ScrapList scraps={scraps?.spacing} />
        </>
      )}
    </>
  );
};

export default Scrap;
