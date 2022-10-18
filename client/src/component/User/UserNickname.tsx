import React, { useState } from "react";
import Link from "next/link";
import { logout } from "../../services/auth-service";
import { useAppDispatch, useAppSelector } from "../../_app/hooks";
import { getUser, setUser } from "../../_reducer/userReducer";
import { Button } from "../common/Button/Button";
import { AlertToast } from "../common/AlertToast/AlertToast";

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
        <>
          <div>{user.nickname}님</div>
          <Button color="lightYellow" onClick={onClickLogout}>
            로그아웃
          </Button>
        </>
      ) : (
        <Link href="/login" passHref>
          <Button color="lightYellow">로그인하기</Button>
        </Link>
      )}
      {ShowMessage(isLogout)}
    </>
  );
};
