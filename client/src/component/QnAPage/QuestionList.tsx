import React, { useState, useEffect } from "react";
import { IQnaDetail, IQuestion } from "../../../types";
import { getQuestionDetail, getQuestions } from "../../services/qna-service";
import { SmallText } from "../Title/Title";
import style from "./QnaPage.module.scss";

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";

export const QuestionList = () => {
  const [qnaList, setQnaList] = useState<IQuestion>();
  const [qnaDetail, setQnaDetail] = useState<IQnaDetail>();
  const [id, setId] = useState<string>("");
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const getData = async () => {
    const list = await getQuestions(1);
    const detail = await getQuestionDetail(id);
    setQnaList(list);
    setQnaDetail(detail);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const renderQna =
    qnaList?.result &&
    qnaList.result.map((qna) => {
      return (
        <Accordion
          key={qna._id}
          onClick={() => setId(qna._id)}
          expanded={expanded === qna._id}
          onChange={handleChange(qna._id)}
          style={{ minWidth: "20rem" }}
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
            <div className={style.answer}>
              {qnaDetail?.answer ? (
                qnaDetail.answer._source.answer
              ) : (
                <>아직 답변이 등록되지 않았습니다.</>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      );
    });

  return (
    <div className="margin-x">
      <div>{renderQna}</div>
    </div>
  );
};
