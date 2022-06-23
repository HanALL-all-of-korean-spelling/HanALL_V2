import React from "react";
import classNames from "classnames";
import style from "./Button.module.scss";

type buttonType = {
  children: any;
  color: string;
  shadow?: boolean;
  outline?: boolean;
  onClick?: () => void;
  type?: string;
};

export const Button = ({
  children,
  color,
  shadow,
  outline,
  onClick,
}: buttonType) => {
  return (
    <button
      className={classNames(style["Button"], style[color], {
        [style.shadow]: shadow,
        [style.outline]: outline,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  color: "yellow",
  type: "submit",
};
