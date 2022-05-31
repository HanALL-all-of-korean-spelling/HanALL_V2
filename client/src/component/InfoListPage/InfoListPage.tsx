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
          <div key={info._id}>
            <div>{info._source.title}</div>
            <div>{info._source.hits}</div>
            <div>{info._source.created_at}</div>
          </div>
        </>
      );
    });

  return <>{renderList}</>;
};
