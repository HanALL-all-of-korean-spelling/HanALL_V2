import React, { useState } from "react";
import { QuestionInputs } from "../../../types";
import { postQuestions } from "../../services/qna-service";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

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
    <form onSubmit={handleSubmit} className="flex-col">
      <div className="mb-1 flex-col">
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
      <Button type="submit">등록하기</Button>
    </form>
  );
};
