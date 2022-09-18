import React from "react";
import style from "./Input.module.scss";

type inputType = {
  placeholder?: string;
  value: string;
  name?: string;
  type?: string;
  onChange: any;
  fullWidth?: boolean;
  textArea?: boolean;
  required?: boolean;
  minLength?: number;
};

export const Input = ({
  placeholder,
  value,
  name,
  type,
  onChange,
  textArea,
  fullWidth,
  required,
  minLength,
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
          required={required}
        ></textarea>
      ) : (
        <input
          className={`${style.Input} ${style.fullWidth}`}
          placeholder={placeholder}
          value={value}
          type={type}
          name={name}
          onChange={onChange}
          required={required}
          minLength={minLength}
        ></input>
      )}
    </>
  );
};
