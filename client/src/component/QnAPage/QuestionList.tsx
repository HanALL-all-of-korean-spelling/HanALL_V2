import React, { useState, useEffect } from "react";
import { getQuestionDetail, getQuestions } from "../../services/qna-service";
import { useAppDispatch, useAppSelector } from "../../_app/hooks";
import { getTest } from "../../_reducer/testReducer";
import { QuestionDetail } from "./QuestionDetail";
import { SmallText } from "../Title/Title";
import { PaginationView } from "../PaginationView/PaginationView";
import style from "./QnaPage.module.scss";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MarkChatReadOutlinedIcon from "@mui/icons-material/MarkChatReadOutlined";
import {
  getQnaDetail,
  getQnaList,
  setQnaDetail,
  setQnaList,
} from "../../_reducer/qnaReducer";

export const QuestionList = () => {
  const dispatch = useAppDispatch();
  const [id, setId] = useState<string>("");
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const page = useAppSelector(getTest).page;
  const qnaList = useAppSelector(getQnaList);
  const qnaDetail = useAppSelector(getQnaDetail);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    const getData = async () => {
      const list = await getQuestions(page);
      const detail = await getQuestionDetail(id);
      dispatch(setQnaList(list));
      dispatch(setQnaDetail(detail));
    };
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
            {qnaDetail && <QuestionDetail id={id} qnaDetail={qnaDetail} />}
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
