import React from "react";
import style from "./Input.module.scss";

type inputType = {
  placeholder: string;
  value: string;
  name?: string;
  onChange: any;
  type?: string;
};

export const Input = ({ placeholder, value, name, onChange }: inputType) => {
  return (
    <input
      className={style.Input}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    ></input>
  );
};
