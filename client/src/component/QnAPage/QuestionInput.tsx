import React, { useState } from "react";
import { QuestionInputs } from "../../../types";
import { postQuestions } from "../../services/qna-service";
import { Button } from "../Button/Button";

export const QuestionInput = () => {
  const initialValues: QuestionInputs = { title: "", question: "" };
  const [inputs, setInputs] = useState<QuestionInputs>(initialValues);

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
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        onChange={handleInputChange}
        value={inputs.title}
        placeholder="제목을 입력해주세요."
      ></input>
      <textarea
        placeholder="추가되었으면 하는 내용을 입력해주세요."
        name="question"
        onChange={handleInputChange}
        value={inputs.question}
      ></textarea>
      <Button type="submit">등록하기</Button>
    </form>
  );
};
