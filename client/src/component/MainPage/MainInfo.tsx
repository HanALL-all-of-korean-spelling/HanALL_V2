import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IMainList } from "../../../types";
import {
  getMainSpacingList,
  getMainSpellingList,
} from "../../services/user-service";
import { InfoListPage } from "../InfoListPage/InfoListPage";
import { Button } from "../Button/Button";
import { Title } from "../Title/Title";

export const MainInfo = () => {
  const [spellingList, setSpellingList] = useState<IMainList>();
  const [spacingList, setSpacingList] = useState<IMainList>();

  const getData = async () => {
    const spelling = await getMainSpellingList();
    const spacing = await getMainSpacingList();
    setSpellingList(spelling);
    setSpacingList(spacing);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <style jsx>{`
        .title {
          padding: 1rem 0.2rem 0.6rem;
        }
        div {
          margin: 0.2rem;
        }
      `}</style>
      {spellingList && (
        <div className="margin-x">
          <div className="flex-between">
            <Title>철자</Title>
            <Link href="/spelling">
              <Button>더보기</Button>
            </Link>
          </div>
          <div>
            <Title color="blue" size="small">
              다른 사람들이 많이 봤어요!
            </Title>
            <InfoListPage list={spellingList.hits_order} type="hits" />
            <Title color="blue" size="small">
              새로 추가됐어요!
            </Title>
            <InfoListPage
              list={spellingList.created_at_order}
              type="created_at"
            />
          </div>
        </div>
      )}
      {spacingList && (
        <div>
          <div className="flex-between">
            <Title>띄어쓰기</Title>
            <Link href="/spacing">
              <Button>더보기</Button>
            </Link>
          </div>
          <div>
            <Title color="blue" size="small">
              다른 사람들이 많이 봤어요!
            </Title>
            <InfoListPage list={spacingList.hits_order} type="hits" />
            <Title color="blue" size="small">
              새로 추가됐어요!
            </Title>
            <InfoListPage
              list={spacingList.created_at_order}
              type="created_at"
            />
          </div>
        </div>
      )}
    </>
  );
};
