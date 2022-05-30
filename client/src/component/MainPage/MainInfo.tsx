import React, { useEffect, useState } from "react";
import {
  getMainSpacingList,
  getMainSpellingList,
} from "../../services/user-service";
import { MainInfoList } from "./MainInfoList";

export const MainInfo = () => {
  const [spellingList, setSpellingList] = useState<any[]>([]);
  const [spacingList, setSpacingList] = useState<any[]>([]);

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
      <div>
        <div>
          <div>철자</div>
          <div>더보기</div>
        </div>
        <div>
          <div>다른 사람들이 많이 봤어요!</div>
          <MainInfoList data={spellingList.hits_order} />
          <div>새로 추가됐어요!</div>
          <MainInfoList data={spellingList.created_at_order} />
        </div>
      </div>
      <div>
        <div>
          <div>띄어쓰기</div>
          <div>더보기</div>
        </div>
        <div>
          <div>다른 사람들이 많이 봤어요!</div>
          <MainInfoList data={spacingList.hits_order} />
          <div>새로 추가됐어요!</div>
          <MainInfoList data={spacingList.created_at_order} />
        </div>
      </div>
    </>
  );
};
