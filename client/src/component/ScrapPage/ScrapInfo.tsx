import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getScrapList } from "../../services/auth-service";
import { IScrap } from "../../../types";
import { ScrapList } from "./ScrapList";
import { MWContainer } from "../common/MWContainer/MWContainer";
import { Title } from "../common/Title/Title";
import { Button } from "../common/Button/Button";

export const ScrapInfo = () => {
  const router = useRouter();

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
      {scraps ? (
        <div>
          <Button onClick={() => router.push("/test")}>시험 응시</Button>
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
        </div>
      ) : (
        <>
          <div>보관된 정보가 없습니다.</div>
          <div>
            철자나 띄어쓰기 정보를 저장하고 맞춤법 퀴즈에 응시해 보세요!
          </div>
        </>
      )}
    </>
  );
};
