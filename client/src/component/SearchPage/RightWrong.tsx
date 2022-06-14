import React from "react";
import { ISearch } from "../../../types";

export const RightWrong = ({ result }: { result: ISearch }) => {
  return (
    <div>
      <style jsx>{`
        div {
          display: flex;
        }
      `}</style>
      <div>
        <div>{result.detail._source.right_words}</div>가 옳은 표현입니다.
      </div>
      {result.flag ? (
        <div>당신은 맞춤법 지킴이!</div>
      ) : (
        <div>우리 같이 맞춤법을 지켜요!</div>
      )}
    </div>
  );
};
