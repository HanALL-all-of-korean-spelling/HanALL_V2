import type { NextPage } from "next";
import { QuestionInput } from "../src/component/QnAPage/QuestionInput";
import { QuestionList } from "../src/component/QnAPage/QuestionList";
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
