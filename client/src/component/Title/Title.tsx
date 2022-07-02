import React from "react";
import classNames from "classnames";
import style from "./Title.module.scss";

type titleType = {
  children: string;
  color: string;
  bold?: boolean;
};

export const Title = ({ children, color, bold }: titleType) => {
  return (
    <div
      className={classNames(style["Title"], style[color], {
        [style.bold]: bold,
      })}
    >
      {children}
    </div>
  );
};

Title.defaultProps = {
  color: "pink",
  type: "submit",
};
