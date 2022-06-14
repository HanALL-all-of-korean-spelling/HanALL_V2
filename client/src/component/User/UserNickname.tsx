import React, { useEffect, useState } from "react";
import { IUser } from "../../../types/auth";
import { getUserInfo, logout } from "../../services/auth-service";
import Link from "next/link";

export const UserNickname = () => {
  const [user, setUser] = useState<IUser>();

  const getData = async () => {
    const userInfo = await getUserInfo();
    setUser(userInfo);
    console.log(userInfo);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <style jsx>{`
        button {
          background-color: white;
          border: none;
          border-radius: 10px;
          padding: 5px;
          margin-left: 5px;
        }
      `}</style>
      {user ? (
        <div>
          <div>{user.nickname}님</div>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <Link href="/login">
          <button>로그인하기</button>
        </Link>
      )}
    </>
  );
};
