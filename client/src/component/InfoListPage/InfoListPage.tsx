import Link from "next/link";
import React from "react";
import { IList } from "../../../types";
import { ListView } from "../ListView/ListView";

export const InfoListPage = ({ list }: { list: IList[] }) => {
  const renderList =
    list &&
    list.map((info) => {
      return (
        <Link href="/detail/[id]" as={`/detail/${info._id}`}>
          <div key={info._id}>
            <div>{info._source.title}</div>
            <div>{info._source.hits}</div>
          </div>
        </Link>
      );
    });

  return <ListView>{renderList}</ListView>;
};
