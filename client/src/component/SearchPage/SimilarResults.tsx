import Link from "next/link";
import React from "react";
import { ISearch } from "../../../types";

export const SimilarResults = ({ result }: { result: ISearch }) => {
  const renderSimilarResult =
    result.similar &&
    result.similar.map((similar) => {
      return (
        <>
          <style jsx>{`
            div {
              display: flex;
            }
          `}</style>
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
    <>
      <style jsx>{`
        .similar {
          font-weight: bold;
        }
      `}</style>
      <div className="similar">유사 검색 결과</div>
      <div>{renderSimilarResult}</div>
    </>
  );
};
