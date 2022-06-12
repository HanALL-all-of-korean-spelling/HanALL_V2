import React, { useState, useEffect } from "react";
import { IQuestion } from "../../../types";
import { getQuestions } from "../../services/qna-service";

export const QuestionList = () => {
  const [qnaList, setQnaList] = useState<IQuestion>();
  const getData = async () => {
    const list = await getQuestions(1);
    setQnaList(list);
  };

  useEffect(() => {
    getData();
  }, [qnaList]);

  const renderQna =
    qnaList?.result &&
    qnaList.result.map((qna) => {
      return (
        <div key={qna._id}>
          <div>{qna._source.title}</div>
          <div>{qna._source.created_at}</div>
        </div>
      );
    });

  return <div>{renderQna}</div>;
};
