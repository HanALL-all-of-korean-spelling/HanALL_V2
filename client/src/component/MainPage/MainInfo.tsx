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

  const renderMainInfo = (list: IMainList, title: string, link: string) => {
    return (
      <div className="margin-x">
        <div className="flex-between">
          <Title>{title}</Title>
          <Link href={link} passHref>
            <Button>더보기</Button>
          </Link>
        </div>
        <div>
          <Title color="blue" size="small">
            다른 사람들이 많이 봤어요!
          </Title>
          <InfoListPage list={list.hits_order} type="hits" />
          <Title color="blue" size="small">
            새로 추가됐어요!
          </Title>
          <InfoListPage list={list.created_at_order} type="created_at" />
        </div>
      </div>
    );
  };

  return (
    <>
      {spellingList && renderMainInfo(spellingList, "철자", "/spelling")}
      {spacingList && renderMainInfo(spacingList, "띄어쓰기", "/spacing")}
    </>
  );
};
