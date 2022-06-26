import Link from "next/link";
import React, { useState, useEffect } from "react";
import { IToday } from "../../../types";
import { getTodayInfo } from "../../services/user-service";
import { Button } from "../Button/Button";

export const TodaySpelling = () => {
  const [todayInfo, setTodayInfo] = useState<IToday>();

  const getData = async () => {
    const info = await getTodayInfo();
    setTodayInfo(info);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {todayInfo && (
        <div>
          <style jsx>{`
            .todayTitle {
              font-weight: bold;
              font-size: 1.5rem;
              margin-bottom: 1.5rem;
            }
            div {
              margin: 1rem;
            }
          `}</style>
          <div className="todayTitle">오늘의 맞춤법</div>
          <Link href="/detail/[id]" as={`/detail/${todayInfo._id}`}>
            <div className="pink-title-2">{todayInfo._source.title}</div>
          </Link>
          <div>
            <div>😄 옳은 표현: {todayInfo._source.right_words}</div>
            <div>{todayInfo._source.description}</div>
            <div>{todayInfo._source.helpful_info}</div>
            {todayInfo._source.related?.id && (
              <Link
                href="/detail/[id]/"
                as={`/detail/${todayInfo._source.related?.id}`}
              >
                <Button color="white" outline shadow>
                  친구 {todayInfo._source.related.title}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};
