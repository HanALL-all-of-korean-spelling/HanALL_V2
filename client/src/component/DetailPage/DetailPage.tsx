import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IDetail } from "../../../types";
import { getUserInfo } from "../../services/auth-service";
import {
  getSpellingDetail,
  scrapSpacing,
  scrapSpelling,
} from "../../services/user-service";

export const DetailPage = ({ id }: { id: string | string[] }) => {
  const [detailInfo, setDetailInfo] = useState<IDetail>();
  const [user, setUser] = useState();

  const getData = async () => {
    const detail = await getSpellingDetail(id);
    setDetailInfo(detail);
    const userInfo = await getUserInfo();
    setUser(userInfo);
    console.log(userInfo);
  };

  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  return (
    <>
      <style jsx>{`
        .flexN {
          display: flex;
          flex-direction: row;
          width: 150px;
          align-items: center;
        }
        div {
          display: flex;
          flex-direction: column;
          align-content: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          margin-left: 10%;
          margin-top: 10px;
        }
        button {
          background-color: #ffde88;
          border: none;
          border-radius: 10px;
          width: 100px;
          padding: 15px;
          margin-left: 5px;
        }
      `}</style>
      {detailInfo && (
        <div>
          <div>
            <div>{detailInfo.title}</div>
            <div className="flexN">
              <div>조회수</div>
              <div>{detailInfo.hits}</div>
            </div>
            <div className="flexN">
              <div>보관</div>
              <div>{detailInfo.scraps}</div>
            </div>
          </div>
          <div>
            <div>😄 옳은 표현: {detailInfo.right_words}</div>
            <div>🤔 틀린 표현: {detailInfo.wrong_words}</div>
            <div>{detailInfo.description}</div>
            <div>{detailInfo.helpful_info}</div>
            {detailInfo.type === "spacing" ? (
              <button
                onClick={() => {
                  if (user) {
                    scrapSpacing(id);
                  } else {
                    alert("스크랩하려면 로그인해주세요");
                  }
                }}
              >
                보관하기
              </button>
            ) : (
              <button
                onClick={() => {
                  if (user) {
                    scrapSpelling(id);
                  } else {
                    alert("스크랩하려면 로그인해주세요");
                  }
                }}
              >
                보관하기
              </button>
            )}
            {detailInfo.related?.id && (
              <Link
                href="/detail/[id]"
                as={`/detail/${detailInfo.related?.id}`}
              >
                <div>친구 {detailInfo.related.title}</div>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};
