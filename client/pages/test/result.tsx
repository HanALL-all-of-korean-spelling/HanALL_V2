import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../src/_app/hooks";
import { getTest } from "../../src/_reducer/testReducer";
import { Button } from "../../src/component/Button/Button";
import { getUserInfo, putTestResult } from "../../src/services/auth-service";
import { IUser } from "../../types/auth";
import css from "styled-jsx/css";

const Result: NextPage = () => {
  const router = useRouter();
  const score = useAppSelector(getTest).score;
  const [user, setUser] = useState<IUser>();

  const getData = async () => {
    if (score) {
      const res = await putTestResult(score);
      if (res) {
        const userInfo = await getUserInfo();
        setUser(userInfo);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <style jsx>{style}</style>
      {user && (
        <>
          <div>
            {user.nickname} 님의 점수는
            <strong>{score * 10}</strong>
            점!
          </div>
          <div>
            총점:
            <strong>{user.point * 10}</strong>
          </div>
          <div>
            현재 등급:
            <strong>{user.rank}</strong>
          </div>
        </>
      )}
      <Button
        fullWidth
        color="lightPink"
        shadow
        onClick={() => {
          router.push("/scrap");
        }}
      >
        보관함으로 돌아가기
      </Button>
    </div>
  );
};

const style = css`
  div:first-child {
    margin-top: 5rem;
  }
  div {
    margin: 0.6rem;
  }
  strong {
    margin-left: 0.4rem;
  }
`;

export default Result;
