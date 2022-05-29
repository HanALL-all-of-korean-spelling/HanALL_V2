import React, { useState, useEffect } from "react";
import { getSearchResult } from "../../services/user-service";

export const RightWrong = ({ result }: { result: Object[] }) => {
  return (
    <div>
      <div>
        {/* <p>{result.result._source.right_words}</p>가 옳은 표현입니다. */}
      </div>
      {result.flag ? (
        <div>당신은 맞춤법 지킴이!</div>
      ) : (
        <div>우리 같이 맞춤법을 지켜요!</div>
      )}
    </div>
  );
};
