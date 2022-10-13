import React, { FormEvent, useState } from "react";
import { QuestionInputs } from "../../../types";
import { postQuestions } from "../../services/qna-service";
import { useAppDispatch } from "../../_app/hooks";
import { addQuestion } from "../../_reducer/qnaReducer";
import { ShowAlertToast } from "../common/AlertToast/AlertToast";
import { Button } from "../common/Button/Button";
import { Input } from "../common/Input/Input";
import style from "./QnaPage.module.scss";

export const QuestionInput = () => {
  const dispatch = useAppDispatch();

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postQuestions(inputs);
    if (res?.status === 201) {
      dispatch(addQuestion(inputs.title));
      setInputs(initialValues);
    } else if (res?.status === 401) {
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
            required
          ></Input>
          <Input
            textArea
            name="question"
            onChange={handleInputChange}
            value={inputs.question}
            placeholder="추가되었으면 하는 내용을 입력해주세요."
            required
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
