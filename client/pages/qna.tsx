import type { NextPage } from "next";
import { QuestionInput } from "../src/component/QnaPage/QuestionInput";
import { QuestionList } from "../src/component/QnaPage/QuestionList";

const Qna: NextPage = () => {
  return (
    <div className="flex-between">
      <QuestionInput />
      <QuestionList />
    </div>
  );
};

export default Qna;
