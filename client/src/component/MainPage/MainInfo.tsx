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
    console.log(spelling);
    console.log(spacing);
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
        <MainInfoList data={spellingList} />
      </div>
      <div>
        <div>
          <div>띄어쓰기</div>
          <div>더보기</div>
        </div>
        <MainInfoList data={spacingList} />
      </div>
    </>
  );
};
