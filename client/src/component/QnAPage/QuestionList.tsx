import React, { useState, useEffect } from "react";
import { IQDetail, IQuestion } from "../../../types";
import { getQuestionDetail, getQuestions } from "../../services/qna-service";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const QuestionList = () => {
  const [qnaList, setQnaList] = useState<IQuestion>();
  const [qnaDetail, setQnaDetail] = useState<IQDetail>();
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
    setQnaDetail(detail.question);
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
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div style={{ width: "70%", flexShrink: 0 }}>
              {qna._source.title}
            </div>
            <div>{qna._source.created_at.substring(0, 10)}</div>
          </AccordionSummary>
          <AccordionDetails>
            {qnaDetail && (
              <div>
                <div>{qnaDetail._source.question}</div>
                <div className="flex-between">
                  <div>{qnaDetail._source.nickname}</div>
                  <div>{qnaDetail._source.created_at.substring(0, 10)}</div>
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
