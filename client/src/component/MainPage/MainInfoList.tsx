import Link from "next/link";
import React from "react";
import { IList } from "../../../types";
import { ListView } from "../ListView/ListView";

export const MainInfoList = ({
  data,
  type,
}: {
  data: IList[];
  type: string;
}) => {
  const renderInfo =
    data &&
    data.map((info) => {
      return (
        <>
          <Link href="/detail/[id]" as={`/detail/${info._id}`}>
            <div key={info._id}>
              <div>{info._source.title}</div>
              {type == "hit" && <div>{info._source.hits}</div>}
              {type == "create" && <div>{info._source.created_at}</div>}
            </div>
          </Link>
        </>
      );
    });
  return <ListView>{renderInfo}</ListView>;
};
