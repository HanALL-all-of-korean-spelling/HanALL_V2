import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IMainList } from "../../../types";
import {
  getMainSpacingList,
  getMainSpellingList,
} from "../../services/user-service";
import { MainInfoList } from "./MainInfoList";
import { getUserInfo, logout } from "../../services/auth-service";

export const MainInfo = () => {
  const [spellingList, setSpellingList] = useState<IMainList>();
  const [spacingList, setSpacingList] = useState<IMainList>();
  const [user, setUser] = useState();

  const getData = async () => {
    const spelling = await getMainSpellingList();
    const spacing = await getMainSpacingList();
    const userInfo = await getUserInfo();
    setSpellingList(spelling);
    setSpacingList(spacing);
    setUser(userInfo);
    console.log(userInfo);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {spellingList && (
        <div>
          <button onClick={logout}>로그아웃</button>
          <div>
            <div>철자</div>
            <Link href="/spelling">
              <div>더보기</div>
            </Link>
          </div>
          <div>
            <div>다른 사람들이 많이 봤어요!</div>
            <MainInfoList data={spellingList.hits_order} />
            <div>새로 추가됐어요!</div>
            <MainInfoList data={spellingList.created_at_order} />
          </div>
        </div>
      )}
      <hr />
      {spacingList && (
        <div>
          <div>
            <div>띄어쓰기</div>
            <Link href="/spacing">
              <div>더보기</div>
            </Link>
          </div>
          <div>
            <div>다른 사람들이 많이 봤어요!</div>
            <MainInfoList data={spacingList.hits_order} />
            <div>새로 추가됐어요!</div>
            <MainInfoList data={spacingList.created_at_order} />
          </div>
        </div>
      )}
    </>
  );
};
