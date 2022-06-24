import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IMainList } from "../../../types";
import {
  getMainSpacingList,
  getMainSpellingList,
} from "../../services/user-service";
import { MainInfoList } from "./MainInfoList";
import { Button } from "../Button/Button";

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
      {spellingList && (
        <div>
          <div>
            <div>철자</div>
            <Link href="/spelling">
              <Button>더보기</Button>
            </Link>
          </div>
          <div>
            <div>다른 사람들이 많이 봤어요!</div>
            <MainInfoList data={spellingList.hits_order} type="hit" />
            <div>새로 추가됐어요!</div>
            <MainInfoList data={spellingList.created_at_order} type="create" />
          </div>
        </div>
      )}
      <hr />
      {spacingList && (
        <div>
          <div>
            <div>띄어쓰기</div>
            <Link href="/spacing">
              <Button>더보기</Button>
            </Link>
          </div>
          <div>
            <div>다른 사람들이 많이 봤어요!</div>
            <MainInfoList data={spacingList.hits_order} type="hit" />
            <div>새로 추가됐어요!</div>
            <MainInfoList data={spacingList.created_at_order} type="create" />
          </div>
        </div>
      )}
    </>
  );
};
