import React, { FormEvent, useState } from "react";
import { QuestionInputs } from "../../../types";
import { postQuestions } from "../../services/qna-service";
import { useAppDispatch } from "../../_app/hooks";
import { addQuestion } from "../../_reducer/qnaReducer";
import { ShowAlertToast } from "../common/AlertToast/AlertToast";
import { Button } from "../common/Button/Button";
import { Input } from "../common/Input/Input";
import { Title } from "../common/Title/Title";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import style from "./QnaPage.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export const QuestionInput = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

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
      router.push({ pathname: "/qna", query: { page: 1 } });
    } else if (res?.status === 401) {
      setIsOpen(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.QuestionInput}>
      <div>
        <Link href={{ pathname: "/qna", query: { page: 1 } }} passHref>
          <ArrowBackIosIcon />
        </Link>
        <Title color="black" size="mid">
          문의글 작성
        </Title>
      </div>
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
  );
};
