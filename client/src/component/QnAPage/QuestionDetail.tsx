import React from "react";
import { IQnaDetail } from "../../../types";
import { deleteQuestionDetail } from "../../services/qna-service";
import { AnswerInput } from "./AnswerInput";
import { Button } from "../Button/Button";
import { SmallText } from "../Title/Title";
import style from "./QnaPage.module.scss";

export const QuestionDetail = ({
  qnaDetail,
  id,
}: {
  qnaDetail: IQnaDetail;
  id: string;
}) => {
  const onClickDelete = async () => {
    await deleteQuestionDetail(id);
  };
  return (
    <div>
      {qnaDetail?.question && (
        <div className={style.questionContent}>
          <div>{qnaDetail.question._source.question}</div>
          <SmallText>{qnaDetail.question._source.nickname}</SmallText>
          <Button shadow color="white" onClick={onClickDelete}>
            삭제
          </Button>
        </div>
      )}
      {qnaDetail?.answer ? (
        <div className={style.answer}>{qnaDetail.answer._source.answer}</div>
      ) : (
        <>
          <div className={style.answer}>아직 답변이 등록되지 않았습니다.</div>
          <AnswerInput id={id} />
        </>
      )}
    </div>
  );
};
