import Link from "next/link";
import React from "react";
import { ISearch } from "../../../types";
import { ListView } from "../ListView/ListView";
import { Title } from "../Title/Title";

export const SimilarResults = ({ result }: { result: ISearch }) => {
  const renderSimilarResult =
    result.similar &&
    result.similar.map((similar) => {
      return (
        <>
          <Link href="/detail/[id]" as={`/detail/${similar._id}`} passHref>
            <div key={similar._id}>
              <div>{similar._source.title}</div>
              <div>{similar._source.hits}</div>
            </div>
          </Link>
        </>
      );
    });

  return (
    <div>
      <Title>유사 검색 결과</Title>
      {result.similar.length > 0 ? (
        <ListView>{renderSimilarResult}</ListView>
      ) : (
        <div>유사 검색 결과가 없습니다.</div>
      )}
    </div>
  );
};
