import React from "react";
import style from "./Input.module.scss";

type inputType = {
  placeholder: string;
  value: string;
  name?: string;
  type?: string;
  onChange: any;
  textArea?: boolean;
};

export const Input = ({
  placeholder,
  value,
  name,
  type,
  onChange,
  textArea,
}: inputType) => {
  return (
    <>
      {textArea ? (
        <textarea
          className={`${style.Input} ${style.TextArea}`}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          className={style.Input}
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          onChange={onChange}
        ></input>
      )}
    </>
  );
};
