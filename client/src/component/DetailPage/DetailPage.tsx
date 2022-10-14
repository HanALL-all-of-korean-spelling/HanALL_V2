import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IDetail } from "../../../types";
import { scrapSpacing, scrapSpelling } from "../../services/user-service";
import { useAppSelector } from "../../_app/hooks";
import { getUser } from "../../_reducer/userReducer";
import { ShowAlertToast } from "../common/AlertToast/AlertToast";
import { Button } from "../common/Button/Button";
import { SmallText, Title } from "../common/Title/Title";
import { RelatedInfo } from "./RelatedInfo";
import style from "./DetailPage.module.scss";

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
        <div className={style.DetailPage}>
          <Title>{detailInfo.title}</Title>
          <div className={style.topInfo}>
            <div>
              <SmallText>조회수</SmallText>
              <div>{detailInfo.hits}</div>
            </div>
            <div>
              <SmallText>보관</SmallText>
              <div>{detailInfo.scraps}</div>
            </div>
          </div>
          <div>
            <div className={style.answer}>
              <div>😄 옳은 표현:</div>
              <div>{detailInfo.right_words}</div>
            </div>
            <div className={style.answer}>
              <div>🤔 틀린 표현:</div>
              <div>{detailInfo.wrong_words}</div>
            </div>
            <div className={style.content}>
              <div>{detailInfo.description}</div>
              <div>{detailInfo.helpful_info}</div>
            </div>
            <div className={style.BtnCont}>
              <Button
                color="white"
                shadow
                onClick={() =>
                  user ? setScrapAlert() : alert("스크랩하려면 로그인해주세요")
                }
              >
                보관하기
              </Button>
              {ShowAlertToast(isOpen, messageContent)}
            </div>
          </div>
          {detailInfo.related && <RelatedInfo related={detailInfo.related} />}
        </div>
      )}
    </>
  );
};
