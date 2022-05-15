import type { NextPage } from "next";
import { QuestionInput } from "../src/component/QnaPage/QuestionInput";
import { QuestionList } from "../src/component/QnaPage/QuestionList";

const Qna: NextPage = () => {
  return (
    <>
      <QuestionInput />
      <QuestionList />
    </>
  );
};

export default Qna;
