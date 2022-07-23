import Link from "next/link";
import React from "react";
import { IList } from "../../../types";
import { ListView } from "../ListView/ListView";

export const InfoListPage = ({
  list,
  type,
}: {
  list: IList[];
  type: string;
}) => {
  const renderList =
    list &&
    list.map((info) => {
      return (
        <Link
          href="/detail/[id]"
          as={`/detail/${info._id}`}
          key={info._id}
          passHref
        >
          <div>
            <div>{info._source.title}</div>
            {type == "hits" && <div>{info._source.hits}</div>}
            {type == "created_at" && (
              <div>{info._source.created_at?.substring(0, 10)}</div>
            )}
            {type == "scraps" && <div>{info._source.scraps}</div>}
          </div>
        </Link>
      );
    });

  return <ListView>{renderList}</ListView>;
};
