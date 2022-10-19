import React from "react";
import Link from "next/link";
import { IRelated } from "../../../types";
import { ListView } from "../common/ListView/ListView";

export const ScrapList = ({ scraps }: { scraps: IRelated[] }) => {
  return (
    <ListView>
      {scraps?.map((info) => (
        <>
          <Link href="/detail/[id]" as={`/detail/${info.id}`} passHref>
            <div key={info.id}>
              <div>{info.title}</div>
            </div>
          </Link>
        </>
      ))}
    </ListView>
  );
};
