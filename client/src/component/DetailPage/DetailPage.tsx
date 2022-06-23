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
import styles from "./DetailPage.module.scss";

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
        <div>
          <div>
            <div>{detailInfo.title}</div>
            <div className={styles.flexN}>
              <div>조회수</div>
              <div>{detailInfo.hits}</div>
            </div>
            <div className={styles.flexN}>
              <div>보관</div>
              <div>{detailInfo.scraps}</div>
            </div>
          </div>
          <div>
            <div>😄 옳은 표현: {detailInfo.right_words}</div>
            <div>🤔 틀린 표현: {detailInfo.wrong_words}</div>
            <div>{detailInfo.description}</div>
            <div>{detailInfo.helpful_info}</div>

            <Button
              color="white"
              shadow
              onClick={() =>
                user ? selectDetailInfo() : alert("스크랩하려면 로그인해주세요")
              }
            >
              보관하기
            </Button>

            {detailInfo.related?.id && (
              <Link
                href="/detail/[id]"
                as={`/detail/${detailInfo.related?.id}`}
              >
                <Button color="white" outline shadow>
                  친구 {detailInfo.related.title}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};
