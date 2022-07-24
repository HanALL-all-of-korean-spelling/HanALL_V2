import React, { useState, useEffect } from "react";
import { IQnaDetail, IQuestion } from "../../../types";
import { getQuestionDetail, getQuestions } from "../../services/qna-service";
import { SmallText } from "../Title/Title";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
            <div style={{ width: "70%", flexShrink: 0 }}>
              {qna._source.title}
            </div>
            <SmallText>{qna._source.created_at.substring(0, 10)}</SmallText>
          </AccordionSummary>
          {/* 문의 상세 내용 */}
          <AccordionDetails>
            {qnaDetail?.question && (
              <div>
                <div>{qnaDetail.question._source.question}</div>
                <div className="flex-between">
                  <SmallText>{qnaDetail.question._source.nickname}</SmallText>
                  <SmallText>
                    {qnaDetail.question._source.created_at.substring(0, 10)}
                  </SmallText>
                </div>
              </div>
            )}
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
