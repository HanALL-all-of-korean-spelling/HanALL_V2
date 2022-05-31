import React, { useState, useEffect } from "react";
import { IToday } from "../../../types";
import { getTodayInfo } from "../../services/user-service";

export const TodaySpelling = () => {
  const [todayInfo, setTodayInfo] = useState<IToday>();

  const getData = async () => {
    const info = await getTodayInfo();
    setTodayInfo(info._source);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {todayInfo && (
        <>
          <div>오늘의 맞춤법</div>
          <div>{todayInfo.title}</div>
          <div>
            <div>😄 옳은 표현: {todayInfo.right_words}</div>
            <div>{todayInfo.description}</div>
            <div>{todayInfo.helpful_info}</div>
            {todayInfo.related && <div>친구 {todayInfo.related.title}</div>}
          </div>
        </>
      )}
    </>
  );
};
