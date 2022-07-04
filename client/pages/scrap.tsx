import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IScrap } from "../types";
import { getScrapList } from "../src/services/auth-service";
import { ScrapList } from "../src/component/ScrapPage/ScrapList";
import { Title } from "../src/component/Title/Title";

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
          <div className="margin-x">
            <Title size="mid">철자</Title>
            <ScrapList scraps={scraps?.spelling} />
          </div>
          <div className="margin-x">
            <Title size="mid">띄어쓰기</Title>
            <ScrapList scraps={scraps?.spacing} />
          </div>
        </>
      )}
    </>
  );
};

export default Scrap;
