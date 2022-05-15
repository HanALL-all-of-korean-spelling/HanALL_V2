import React from "react";

export const RightWrong = () => {
  const result = {
    type: "spelling",
    hit: 34,
    scrap: 32,
    title: "베개 vs 배게",
    right_words: "베개",
    wrong_words: ["배게", "배개", "베게"],
    Description: "베개에 대한 설명",
    Helpful_info: "쉽게 외우는 방법",
    Related: "",
    flag: true,
  };

  return (
    <div>
      <div>
        <p>{result.right_words}</p>가 옳은 표현입니다.
      </div>
      {result.flag ? (
        <div>당신은 맞춤법 지킴이!</div>
      ) : (
        <div>우리 같이 맞춤법을 지켜요!</div>
      )}
    </div>
  );
};
