import React from "react";
import { ISearch } from "../../../types";

export const RightWrong = ({ result }: { result: ISearch }) => {
  return (
    <div>
      <div>
        <p>{result.detail._source.right_words}</p>가 옳은 표현입니다.
      </div>
      {result.flag ? (
        <div>당신은 맞춤법 지킴이!</div>
      ) : (
        <div>우리 같이 맞춤법을 지켜요!</div>
      )}
    </div>
  );
};
