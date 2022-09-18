import React from "react";
import { IUser } from "../../../types/auth";
import css from "styled-jsx/css";

export const MyInfo = ({ user, score }: { user: IUser; score?: number }) => {
  return (
    <div>
      <style jsx>{style}</style>
      {score && (
        <div>
          {user.nickname} 님의 점수는
          <strong>{score * 10}</strong>
          점!
        </div>
      )}
      <div>
        나의 총점:
        <strong>{user.point * 10}</strong>
      </div>
      <div>
        현재 등급:
        <strong>{user.rank}</strong>
      </div>
    </div>
  );
};

const style = css`
  div {
    margin: 0.6rem;
  }
  strong {
    margin-left: 0.4rem;
  }
`;
