import React from "react";
import { useRouter } from "next/router";
import { ITest } from "../../../types";
import { useAppDispatch } from "../../_app/hooks";
import { OutlineBox } from "../OutlineBox/OutlineBox";
import { Title } from "../Title/Title";
import css from "styled-jsx/css";
import { setScore } from "../../_reducer/testReducer";
import { Button } from "../Button/Button";

export const TestList = ({ quizzes }: { quizzes: ITest[] }) => {
  const router = useRouter();

  const renderTestList =
    quizzes &&
    quizzes.map((quiz) => {
      return (
        <div key={quiz._id}>
          <style jsx>{style}</style>
          <Title color="black">다음 중 옳은 표현을 고르세요.</Title>
          <Button fullWidth outline color="white" shadow>
            {quiz._source.right_words}
          </Button>
          <Button fullWidth outline color="white" shadow>
            {quiz._source.wrong_words}
          </Button>
        </div>
      );
    });

  return (
    <>
      <div>{renderTestList}</div>
      <Button
        fullWidth
        shadow
        onClick={() => {
          router.push("/test/result");
        }}
      >
        점수 보기
      </Button>
    </>
  );
};

const style = css`
  div {
    margin-bottom: 4rem;
  }
`;
