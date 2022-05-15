import React from "react";

export const SimilarResults = () => {
  const spellings = {
    similar_result: [
      {
        _index: "words",
        _type: "_doc",
        _id: "1",
        _score: 0.53899646,
        _source: {
          title: "베개 vs 배게",
          hit: 34,
        },
      },
      {
        _index: "words",
        _type: "_doc",
        _id: "2",
        _score: 0.53899646,
        _source: {
          title: "왠지 vs 웬지",
          hit: 54,
        },
      },
      {
        _index: "words",
        _type: "_doc",
        _id: "3",
        _score: 0.53899646,
        _source: {
          title: "웬만하면 vs 왠만하면",
          hit: 45,
        },
      },
    ],
    flag: true,
    detail: {
      type: "spelling",
      hit: 34,
      scrap: 32,
      title: "베개 vs 배게",
      right_words: "베개",
      wrong_words: ["배게", "배개", "베게"],
      Description: "베개에 대한 설명",
      Helpful_info: "쉽게 외우는 방법",
      Related: "",
      flag: true,
    },
  };

  const renderSimilarResult =
    spellings.similar_result &&
    spellings.similar_result.map((similar) => {
      return (
        <div key={similar._id}>
          <div>{similar._source.title}</div>
          <div>{similar._source.hit}</div>
        </div>
      );
    });

  return (
    <>
      <div>유사 검색 결과</div>
      <div>{renderSimilarResult}</div>
    </>
  );
};
