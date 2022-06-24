import React, { useState, useEffect } from "react";
import { IQDetail, IQuestion } from "../../../types";
import { getQuestionDetail, getQuestions } from "../../services/qna-service";
import { ListView } from "../ListView/ListView";

export const QuestionList = () => {
  const [qnaList, setQnaList] = useState<IQuestion>();
  const [qnaDetail, setQnaDetail] = useState<IQDetail>();
  const [id, setId] = useState<string>("");

  const getData = async () => {
    const list = await getQuestions(1);
    const detail = await getQuestionDetail(id);
    setQnaList(list);
    setQnaDetail(detail.question);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const renderQna =
    qnaList?.result &&
    qnaList.result.map((qna) => {
      return (
        <div key={qna._id} onClick={() => setId(qna._id)}>
          <div>{qna._source.title}</div>
          <div>{qna._source.created_at.substring(0, 10)}</div>
        </div>
      );
    });

  return (
    <>
      <ListView>{renderQna}</ListView>
      {qnaDetail && (
        <div key={qnaDetail._id}>
          <div>{qnaDetail._source.title}</div>
          <div>{qnaDetail._source.question}</div>
          <div>{qnaDetail._source.nickname}</div>
          <div>{qnaDetail._source.created_at.substring(0, 10)}</div>
        </div>
      )}
    </>
  );
};
