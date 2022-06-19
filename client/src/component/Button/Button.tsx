import React from "react";
import classNames from "classnames";
import "./Button.module.scss";
import style from "./Button.module.scss";
// import "../../../styles/_settings.colors.scss";

type buttonType = {
  children: any;
  color: string;
};

export function Button({ children, color }: buttonType) {
  return <button className={`${style.Button} ${color}`}>{children}</button>;
}
// export const Button = ({ children, color }: buttonType) => {
//   return <button className={classNames("Button", color)}>{children}</button>;
// };

Button.defaultProps = {
  color: "conceptYellow",
};
