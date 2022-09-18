import React, { useState } from "react";
import Link from "next/link";
import { logout } from "../../services/auth-service";
import { useAppDispatch, useAppSelector } from "../../_app/hooks";
import { getUser, setUser } from "../../_reducer/userReducer";
import { Button } from "../Button/Button";
import { AlertToast } from "../AlertToast/AlertToast";

export const UserNickname = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser).user;
  const [isLogout, setIsLogout] = useState(false);

  const onClickLogout = () => {
    logout();
    dispatch(setUser(undefined));
    setIsLogout(true);
  };

  const ShowMessage = (isLogout: boolean) => {
    if (isLogout) {
      return <AlertToast message="로그아웃 완료" />;
    }
  };

  return (
    <>
      {user ? (
        <div>
          <div>{user.nickname}님</div>
          <Button color="white" onClick={onClickLogout}>
            로그아웃
          </Button>
        </div>
      ) : (
        <Link href="/login" passHref>
          <Button color="white">로그인하기</Button>
        </Link>
      )}
      {ShowMessage(isLogout)}
    </>
  );
};
