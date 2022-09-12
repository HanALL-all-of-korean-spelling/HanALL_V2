import React, { useState, useEffect } from "react";
import { IQnaDetail, IQuestion } from "../../../types";
import { getQuestionDetail, getQuestions } from "../../services/qna-service";
import { useAppSelector } from "../../_app/hooks";
import { getTest } from "../../_reducer/testReducer";
import { AnswerInput } from "./AnswerInput";
import { SmallText } from "../Title/Title";
import { PaginationView } from "../PaginationView/PaginationView";
import style from "./QnaPage.module.scss";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";

export const QuestionList = () => {
  const [qnaList, setQnaList] = useState<IQuestion>();
  const [qnaDetail, setQnaDetail] = useState<IQnaDetail>();
  const [id, setId] = useState<string>("");
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const page = useAppSelector(getTest).page;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const getData = async () => {
    const list = await getQuestions(page);
    const detail = await getQuestionDetail(id);
    setQnaList(list);
    setQnaDetail(detail);
  };

  useEffect(() => {
    getData();
  }, [id, page]);

  const renderQna =
    qnaList?.result &&
    qnaList.result.map((qna) => {
      return (
        <Accordion
          key={qna._id}
          onClick={() => setId(qna._id)}
          expanded={expanded === qna._id}
          onChange={handleChange(qna._id)}
        >
          {/* 문의 타이틀 */}
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className={style.titleCont}>
              <div>{qna._source.title}</div>
              <div>
                {qna._source.answer_flag ? (
                  <MarkChatReadOutlinedIcon className={style.icon} />
                ) : (
                  <div></div>
                )}
                <SmallText>{qna._source.created_at.substring(0, 10)}</SmallText>
              </div>
            </div>
          </AccordionSummary>
          {/* 문의 상세 내용 */}
          <AccordionDetails>
            {qnaDetail?.question && (
              <div className={style.questionContent}>
                <div>{qnaDetail.question._source.question}</div>
                <SmallText>{qnaDetail.question._source.nickname}</SmallText>
              </div>
            )}
            {qnaDetail?.answer ? (
              <div className={style.answer}>
                {qnaDetail.answer._source.answer}
              </div>
            ) : (
              <>
                <div className={style.answer}>
                  아직 답변이 등록되지 않았습니다.
                </div>
                <AnswerInput id={id} />
              </>
            )}
          </AccordionDetails>
        </Accordion>
      );
    });

  return (
    <>
      {qnaList && (
        <div>
          <div className={style.QuestionList}>{renderQna}</div>
          <PaginationView total={qnaList?.total_page} current={page} />
        </div>
      )}
    </>
  );
};
