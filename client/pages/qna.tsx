import type { NextPage } from "next";
import { QuestionInput } from "../src/component/QnaPage/QuestionInput";
import { QuestionList } from "../src/component/QnaPage/QuestionList";
import { MWContainer } from "../src/component/MWContainer/MWContainer";

const Qna: NextPage = () => {
  return (
    <MWContainer>
      <QuestionInput />
      <QuestionList />
    </MWContainer>
  );
};

export default Qna;
