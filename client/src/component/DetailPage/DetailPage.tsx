import React from "react";

function DetailPage() {
  const detailInfo = {
    type: "spelling",
    hit: 34,
    scrap: 32,
    title: "베개 vs 배게",
    right_words: "베개",
    wrong_words: ["배게", "배개", "베게"],
    Description: "베개에 대한 설명",
    Helpful_info: "쉽게 외우는 방법",
    Related: "",
  };

  return (
    <>
      <div>
        <div>{detailInfo.title}</div>
        <div>
          <div>조회수</div>
          <div>{detailInfo.hit}</div>
        </div>
        <div>
          <div>보관</div>
          <div>{detailInfo.scrap}</div>
        </div>
      </div>
      <div>
        <div>😄 옳은 표현: {detailInfo.right_words}</div>
        <div>🤔 틀린 표현: {detailInfo.wrong_words}</div>
        <div>{detailInfo.Description}</div>
        <div>{detailInfo.Helpful_info}</div>
        <div>보관하기</div>
        {detailInfo.Related && <div>친구 {detailInfo.Related}</div>}
      </div>
    </>
  );
}

export default DetailPage;
