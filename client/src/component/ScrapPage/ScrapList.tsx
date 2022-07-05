import React from "react";
import Link from "next/link";
import { IRelated } from "../../../types";
import { ListView } from "../ListView/ListView";

export const ScrapList = ({ scraps }: { scraps: IRelated[] }) => {
  const renderList =
    scraps &&
    scraps.map((info) => {
      return (
        <>
          <Link href="/detail/[id]" as={`/detail/${info.id}`}>
            <div key={info.id}>
              <div>{info.title}</div>
              <div></div>
            </div>
          </Link>
        </>
      );
    });

  return <>{scraps && <ListView>{renderList}</ListView>}</>;
};
