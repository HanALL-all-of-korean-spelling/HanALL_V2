import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IDetail } from "../../../types";
import { getSpellingDetail, scrapSpacing } from "../../services/user-service";

export const DetailPage = ({ id }: { id: string | string[] }) => {
  const [detailInfo, setDetailInfo] = useState<IDetail>();

  const getData = async () => {
    const detail = await getSpellingDetail(id);
    setDetailInfo(detail);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <>
      {detailInfo && (
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
            <div onClick={() => scrapSpacing(id)}>보관하기</div>
            {detailInfo.related?.id && (
              <Link
                href="/detail/[id]"
                as={`/detail/${detailInfo.related?.id}`}
              >
                <div>친구 {detailInfo.related.title}</div>
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
};
