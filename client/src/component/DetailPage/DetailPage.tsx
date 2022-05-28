import React, { useState, useEffect } from "react";
import { getSpellingDetail } from "../../services/user-service";

export const DetailPage = () => {
  const [detailInfo, setDetailInfo] = useState<Object>({});
  let id = "uzEM-oABH_eeTwxVb8dK";
  const getData = async () => {
    const detail = await getSpellingDetail(id);
    console.log(detail);
    setDetailInfo(detail);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <>
      <div>
        <div>{detailInfo.title}</div>
        <div>
          <div>조회수</div>
          <div>{detailInfo.hits}</div>
        </div>
        <div>
          <div>보관</div>
          <div>{detailInfo.scraps}</div>
        </div>
      </div>
      <div>
        <div>😄 옳은 표현: {detailInfo.right_words}</div>
        <div>🤔 틀린 표현: {detailInfo.wrong_words}</div>
        <div>{detailInfo.description}</div>
        <div>{detailInfo.helpful_info}</div>
        <div>보관하기</div>
        {detailInfo.related && <div>친구 {detailInfo.related}</div>}
      </div>
    </>
  );
};
