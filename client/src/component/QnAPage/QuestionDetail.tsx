import React, { useState } from "react";
import { IQnaDetail, QuestionInputs } from "../../../types";
import {
  deleteQuestionDetail,
  putQuestionDetail,
} from "../../services/qna-service";
import { useAppDispatch, useAppSelector } from "../../_app/hooks";
import { editQuestion, deleteQuestion } from "../../_reducer/qnaReducer";
import { getUser } from "../../_reducer/userReducer";
import { AnswerInput } from "./AnswerInput";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { SmallText } from "../Title/Title";
import style from "./QnaPage.module.scss";

export const QuestionDetail = ({
  qnaDetail,
  id,
}: {
  qnaDetail: IQnaDetail;
  id: string;
}) => {
  const dispatch = useAppDispatch();

  // 수정 입력 인풋
  const initialValues: QuestionInputs = { title: "", question: "" };
  const [inputs, setInputs] = useState<QuestionInputs>(initialValues);

  const user = useAppSelector(getUser);

  // 글 작성자인지 체크
  let isWriter = false;
  if (user.user?.nickname === qnaDetail.question?._source.nickname) {
    isWriter = true;
  }

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  // 수정 중 여부
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = async () => {
    setIsEdit(!isEdit);
    setInputs({
      title: qnaDetail.question._source.title,
      question: qnaDetail.question._source.question,
    });
    // 수정 완료
    if (isEdit) {
      const res = await putQuestionDetail(id, inputs);
      if (res) {
        dispatch(
          editQuestion({
            id: id,
            ...inputs,
          })
        );
      }
    }
  };

  const onClickDelete = async () => {
    const res = await deleteQuestionDetail(id);
    if (res) {
      dispatch(deleteQuestion(id));
    }
  };

  return (
    <div>
      {qnaDetail?.question && (
        <div className={style.questionContent}>
          {!isEdit ? (
            <div>{qnaDetail.question._source.question}</div>
          ) : (
            <>
              <Input
                name="title"
                value={inputs.title}
                onChange={handleInputChange}
              ></Input>
              <Input
                textArea
                name="question"
                onChange={handleInputChange}
                value={inputs.question}
              ></Input>
            </>
          )}
          <div className={style.userNickname}>
            <SmallText>{qnaDetail.question._source.nickname}</SmallText>
            {isWriter && (
              <div>
                <Button shadow color="white" onClick={onClickEdit}>
                  {!isEdit ? <>수정</> : <>수정 완료</>}
                </Button>
                <Button shadow color="white" onClick={onClickDelete}>
                  삭제
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {qnaDetail?.answer ? (
        <div className={style.answer}>{qnaDetail.answer._source.answer}</div>
      ) : (
        <>
          <div className={style.answer}>아직 답변이 등록되지 않았습니다.</div>
          {user.isAdmin && <AnswerInput id={id} />}
        </>
      )}
    </div>
  );
};
