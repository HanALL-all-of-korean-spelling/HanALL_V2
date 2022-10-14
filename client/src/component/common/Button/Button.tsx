import React from "react";
import classNames from "classnames";
import style from "./Button.module.scss";

type buttonType = {
  children: React.ReactNode;
  color: string;
  shadow?: boolean;
  outline?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: string;
};

export const Button = ({
  children,
  color,
  shadow,
  outline,
  fullWidth,
  onClick,
}: buttonType) => {
  return (
    <button
      className={classNames(style["Button"], style[color], {
        [style.shadow]: shadow,
        [style.outline]: outline,
        [style.fullWidth]: fullWidth,
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
