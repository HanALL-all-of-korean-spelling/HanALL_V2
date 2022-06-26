import Link from "next/link";
import React from "react";
import { ISearch } from "../../../types";
import { ListView } from "../ListView/ListView";

export const SimilarResults = ({ result }: { result: ISearch }) => {
  const renderSimilarResult =
    result.similar &&
    result.similar.map((similar) => {
      return (
        <>
          <Link href="/detail/[id]" as={`/detail/${similar._id}`}>
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
      <div className="pink-title-1">유사 검색 결과</div>
      <ListView>{renderSimilarResult}</ListView>
    </div>
  );
};
