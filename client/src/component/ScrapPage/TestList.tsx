import React, { useState } from "react";
import { useRouter } from "next/router";
import { ITest } from "../../../types";
import { useAppDispatch } from "../../_app/hooks";
import { setTotalScore } from "../../_reducer/testReducer";
import { Title } from "../Title/Title";
import { Button } from "../Button/Button";
import css from "styled-jsx/css";

export const TestList = ({ quizzes }: { quizzes: ITest[] }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [checkedList, setCheckedList] = useState<Array<string | string[]>>([]);
  const [score, setScore] = useState<number>(0);

  // 클릭한 버튼 정보 저장
  const onClickCheck = (name: string | string[], isRight: boolean) => {
    // 배열에 없으면 (처음 클릭하는 거면) 넣기, 정답이면 +1
    if (!checkedList.includes(name)) {
      setCheckedList([...checkedList, name]);
      if (isRight) setScore(score + 1);
    } else {
      // 다시 클릭하는 거면 빼기, 정답이면 취소니까 -1
      setCheckedList(checkedList.filter((answer) => answer !== name));
      if (isRight) setScore(score - 1);
    }
  };

  const renderTestList =
    quizzes &&
    quizzes.map((quiz) => {
      return (
        <div key={quiz._id}>
          <style jsx>{style}</style>
          <Title color="black">다음 중 옳은 표현을 고르세요.</Title>
          <Button
            fullWidth
            outline
            color={
              checkedList.includes(quiz._source.right_words)
                ? "lightPink"
                : "white"
            }
            shadow
            onClick={() => onClickCheck(quiz._source.right_words, true)}
          >
            {quiz._source.right_words}
          </Button>
          <Button
            fullWidth
            outline
            color={
              checkedList.includes(quiz._source.wrong_words)
                ? "lightPink"
                : "white"
            }
            shadow
            onClick={() => onClickCheck(quiz._source.wrong_words, false)}
          >
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
          dispatch(setTotalScore(score));
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
