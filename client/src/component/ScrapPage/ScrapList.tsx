import React from "react";
import Link from "next/link";
import { IRelated } from "../../../types";

export const ScrapList = ({ scraps }: { scraps: IRelated[] }) => {
  const renderList =
    scraps &&
    scraps.map((info) => {
      return (
        <>
          <style jsx>{`
            div {
              display: flex;
            }
          `}</style>
          <Link href="/detail/[id]" as={`/detail/${info.id}`}>
            <div key={info.id}>
              <div>{info.title}</div>
            </div>
          </Link>
        </>
      );
    });

  return <>{scraps && <>{renderList}</>}</>;
};
