import React from "react";

export const SimilarResults = ({ result }: { result: Object[] }) => {
  const renderSimilarResult =
    result.similar &&
    result.similar.map((similar) => {
      return (
        <div key={similar._id}>
          <div>{similar._source.title}</div>
          <div>{similar._source.hits}</div>
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
