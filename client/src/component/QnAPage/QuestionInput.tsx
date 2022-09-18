import React, { useState } from "react";
import { QuestionInputs } from "../../../types";
import { postQuestions } from "../../services/qna-service";
import { ShowAlertToast } from "../AlertToast/AlertToast";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import style from "./QnaPage.module.scss";

export const QuestionInput = () => {
  const initialValues: QuestionInputs = { title: "", question: "" };
  const [inputs, setInputs] = useState<QuestionInputs>(initialValues);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await postQuestions(inputs);

    if (res.response.status === 401) {
      setIsOpen(true);
    }
  };

  return (
    <div className={style.QuestionInput}>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            name="title"
            onChange={handleInputChange}
            value={inputs.title}
            placeholder="제목을 입력해주세요."
          ></Input>
          <Input
            textArea
            name="question"
            onChange={handleInputChange}
            value={inputs.question}
            placeholder="추가되었으면 하는 내용을 입력해주세요."
          ></Input>
        </div>
        <Button type="submit" fullWidth>
          등록하기
        </Button>
        {ShowAlertToast(isOpen, "로그인 후 이용해 주세요.")}
      </form>
    </div>
  );
};
