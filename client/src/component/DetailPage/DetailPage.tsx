import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IDetail } from "../../../types";
import { scrapSpacing, scrapSpelling } from "../../services/user-service";
import { useAppSelector } from "../../_app/hooks";
import { getUser } from "../../_reducer/userReducer";
import { ShowAlertToast } from "../common/AlertToast/AlertToast";
import { Button } from "../common/Button/Button";
import { Title } from "../common/Title/Title";

export const DetailPage = ({ detailInfo }: { detailInfo: IDetail }) => {
  const router = useRouter();
  const id = router.query.id as string;
  const user = useAppSelector(getUser).user;
  const [isOpen, setIsOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const selectDetailInfo = () => {
    if (detailInfo?.type === "spacing") {
      return scrapSpacing(id);
    } else {
      return scrapSpelling(id);
    }
  };

  const setScrapAlert = async () => {
    const res = await selectDetailInfo();
    // 성공하면 response.data 리턴해서 status가 없음
    if (!res?.status) {
      setMessageContent("스크랩 완료");
      setIsOpen(true);
    } else {
      // 실패하면 에러 메시지 세팅
      setMessageContent(res?.data);
      setIsOpen(true);
    }
  };

  return (
    <>
      {detailInfo && (
        <>
          <style jsx>{`
            .cont {
              max-width: 20rem;
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
            .contDesc > div {
              margin-bottom: 1.2rem;
            }
            .BtnCont {
              margin-bottom: 2rem;
            }
          `}</style>
          <div className="cont">
            <div>
              <Title>{detailInfo.title}</Title>
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
                <Title size="small">😄 옳은 표현:</Title>
                <div>{detailInfo.right_words}</div>
              </div>
              <div className="flex-row">
                <Title size="small">🤔 틀린 표현:</Title>
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
                      ? setScrapAlert()
                      : alert("스크랩하려면 로그인해주세요")
                  }
                >
                  보관하기
                </Button>
                {ShowAlertToast(isOpen, messageContent)}
              </div>

              {detailInfo.related?.id && (
                <Link
                  href="/detail/[id]"
                  as={`/detail/${detailInfo.related?.id}`}
                  passHref
                >
                  <Button color="white" outline shadow>
                    친구
                    <Title size="small">{detailInfo.related.title}</Title>
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
