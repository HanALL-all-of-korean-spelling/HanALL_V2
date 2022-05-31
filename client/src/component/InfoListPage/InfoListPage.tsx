import Link from "next/link";
import React from "react";
import { IList } from "../../../types";

export const InfoListPage = ({ list }: { list: IList[] }) => {
  const renderList =
    list &&
    list.map((info) => {
      return (
        <>
          <style jsx>{`
            div {
              display: flex;
            }
          `}</style>
          <Link href="/detail/[id]" as={`/detail/${info._id}`}>
            <div key={info._id}>
              <div>{info._source.title}</div>
              <div>{info._source.hits}</div>
              <div>{info._source.created_at}</div>
            </div>
          </Link>
        </>
      );
    });

  return <>{renderList}</>;
};
