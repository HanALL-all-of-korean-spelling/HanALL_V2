import React from "react";
import { ISearch } from "../../../types";
import { Title } from "../common/Title/Title";
import style from "./SearchPage.module.scss";

export const RightWrong = ({ result }: { result: ISearch }) => {
  return (
    <div className={style.RightWrong}>
      <div>
        <Title size="small">{result.detail._source.right_words}</Title>(이)가
        옳은 표현입니다.
      </div>
      {result.flag ? (
        <>당신은 맞춤법 지킴이!😀</>
      ) : (
        <>우리 같이 맞춤법을 지켜요!😮🦾</>
      )}
    </div>
  );
};
