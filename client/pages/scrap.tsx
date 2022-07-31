import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IScrap } from "../types";
import { getScrapList } from "../src/services/auth-service";
import { ScrapList } from "../src/component/ScrapPage/ScrapList";
import { Title } from "../src/component/Title/Title";
import { MWContainer } from "../src/component/MWContainer/MWContainer";

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
        <MWContainer>
          <div>
            <Title size="mid">철자</Title>
            <ScrapList scraps={scraps?.spelling} />
          </div>
          <div>
            <Title size="mid">띄어쓰기</Title>
            <ScrapList scraps={scraps?.spacing} />
          </div>
        </MWContainer>
      )}
    </>
  );
};

export default Scrap;
