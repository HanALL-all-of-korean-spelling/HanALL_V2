import React from "react";

export const QuestionList = () => {
  const qnaList = {
    took: 684,
    timed_out: false,
    _shards: {
      total: 1,
      successful: 1,
      skipped: 0,
      failed: 0,
    },
    hits: {
      total: {
        value: 2,
        relation: "eq",
      },
      max_score: 1,
      hits: [
        {
          _index: "board",
          _type: "_doc",
          _id: "lD7CxoABJKku9veNAPj1",
          _score: 1,
          _source: {
            title: "베개 배게 질문",
            created_at: "2022-5-15",
          },
        },
        {
          _index: "board",
          _type: "_doc",
          _id: "lT7FxoABJKku9veNC_iJ",
          _score: 1,
          _source: {
            title: "질문이 있습니다",
            created_at: "2022-5-15",
          },
        },
      ],
    },
  };
  console.log(qnaList.hits.hits);

  const renderQna =
    qnaList.hits.hits &&
    qnaList.hits.hits.map((qna) => {
      return (
        <div key={qna._id}>
          <div>{qna._source.title}</div>
          <div>{qna._source.created_at}</div>
        </div>
      );
    });

  return <div>{renderQna}</div>;
};
