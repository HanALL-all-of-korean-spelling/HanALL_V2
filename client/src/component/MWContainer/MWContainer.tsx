import React from "react";
import classNames from "classnames";
import style from "./MWContainer.module.scss";

type contType = {
  children: React.ReactNode;
  tablet?: boolean;
};

// 모바일 웹 컨테이너: 반응형 디자인
export const MWContainer = ({ children, tablet }: contType) => {
  return (
    <div
      className={classNames(style["MWContainer"], {
        [style.tablet]: tablet,
      })}
    >
      {children}
    </div>
  );
};
