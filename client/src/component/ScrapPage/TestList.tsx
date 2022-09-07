import React from "react";
import { ITest } from "../../../types";
import { OutlineBox } from "../OutlineBox/OutlineBox";
import { Title } from "../Title/Title";
import css from "styled-jsx/css";

export const TestList = ({ quizzes }: { quizzes: ITest[] }) => {
  const renderTestList =
    quizzes &&
    quizzes.map((quiz) => {
      return (
        <div key={quiz._id}>
          <style jsx>{style}</style>
          <Title color="black">다음 중 옳은 표현을 고르세요.</Title>
          <OutlineBox>{quiz._source.right_words}</OutlineBox>
          <OutlineBox>{quiz._source.wrong_words}</OutlineBox>
        </div>
      );
    });
  return <div>{renderTestList}</div>;
};

const style = css`
  div {
    margin-bottom: 4rem;
  }
`;
