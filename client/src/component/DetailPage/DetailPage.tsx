import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IDetail } from "../../../types";
import { getUserInfo } from "../../services/auth-service";
import {
  getSpellingDetail,
  scrapSpacing,
  scrapSpelling,
} from "../../services/user-service";
import { Button } from "../Button/Button";

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

  const selectDetailInfo = () => {
    if (detailInfo?.type === "spacing") {
      return scrapSpacing(id);
    } else {
      return scrapSpelling(id);
    }
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
          <style jsx>{`
            .cont {
              width: 15rem;
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .cont > div:first-child {
              margin-bottom: 2rem;
            }
            div {
              margin: 0.2rem;
            }
            .contDesc {
              margin: 1rem 0 2rem;
            }
            .BtnCont {
              margin-bottom: 2rem;
            }
          `}</style>
          <div className="cont">
            <div>
              <div className="pink-title-1">{detailInfo.title}</div>
              <div className="flex-row flex-end">
                <div className="flex-row mr-1">
                  <div className="mr-05">조회수</div>
                  <div>{detailInfo.hits}</div>
                </div>
                <div className="flex-row">
                  <div className="mr-05">보관</div>
                  <div>{detailInfo.scraps}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex-row">
                <div className="pink-title-3 mr-05">😄 옳은 표현:</div>
                {detailInfo.right_words}
              </div>
              <div className="flex-row">
                <div className="pink-title-3 mr-05">🤔 틀린 표현:</div>
                <div>{detailInfo.wrong_words}</div>
              </div>
              <div className="contDesc">
                <div>{detailInfo.description}</div>
                <div>{detailInfo.helpful_info}</div>
              </div>

              <div className="BtnCont flex-end">
                <Button
                  color="white"
                  shadow
                  onClick={() =>
                    user
                      ? selectDetailInfo()
                      : alert("스크랩하려면 로그인해주세요")
                  }
                >
                  보관하기
                </Button>
              </div>

              {detailInfo.related?.id && (
                <Link
                  href="/detail/[id]"
                  as={`/detail/${detailInfo.related?.id}`}
                >
                  <Button color="white" outline shadow>
                    친구
                    <div className="pink-title-3">
                      {detailInfo.related.title}
                    </div>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
