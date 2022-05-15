import React from "react";
import { InfoListPage } from "../InfoListPage/InfoListPage";

export const MainInfoList = () => {
  return (
    <>
      <div>
        <div>
          <div>철자</div>
          <div>더보기</div>
        </div>
        <InfoListPage />
      </div>
      <div>
        <div>
          <div>띄어쓰기</div>
          <div>더보기</div>
        </div>
        <InfoListPage />
      </div>
    </>
  );
};
