import React from "react";
import style from "./OutlineBox.module.scss";

type boxType = {
  children: React.ReactNode;
};

export const OutlineBox = ({ children }: boxType) => {
  return <div className={style.OutlineBox}>{children}</div>;
};
