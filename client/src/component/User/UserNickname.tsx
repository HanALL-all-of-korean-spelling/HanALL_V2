import React, { useEffect, useState } from "react";
import { IUser } from "../../../types/auth";
import { getUserInfo, logout } from "../../services/auth-service";
import Link from "next/link";
import { Button } from "../Button/Button";

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
      {user ? (
        <div>
          <div>{user.nickname}님</div>
          <Button color="white" onClick={logout}>
            로그아웃
          </Button>
        </div>
      ) : (
        <Link href="/login">
          <Button color="white">로그인하기</Button>
        </Link>
      )}
    </>
  );
};
