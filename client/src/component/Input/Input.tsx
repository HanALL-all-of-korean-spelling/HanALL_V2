import React from "react";
import style from "./Input.module.scss";

type inputType = {
  placeholder: string;
  value: string;
  name?: string;
  type?: string;
  onChange: any;
  fullWidth?: boolean;
  textArea?: boolean;
};

export const Input = ({
  placeholder,
  value,
  name,
  type,
  onChange,
  textArea,
  fullWidth,
}: inputType) => {
  return (
    <>
      {textArea ? (
        <textarea
          className={`${style.Input} ${style.TextArea} ${style.fullWidth}`}
          placeholder={placeholder}
          value={value}
          name={name}
          onChange={onChange}
        ></textarea>
      ) : (
        <input
          className={`${style.Input} ${style.fullWidth}`}
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
