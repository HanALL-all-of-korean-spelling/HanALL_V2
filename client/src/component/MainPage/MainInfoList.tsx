import React from "react";

export const MainInfoList = ({ data }: { data: Array<Object> }) => {
  const renderInfo =
    data &&
    data.map((info) => {
      return (
        // <div key={info._id}>
        //   <div>{info._source.title}</div>
        //   <div>{info._source.hits}</div>
        //   <div>{info._source.created_at}</div>
        // </div>
        <div>hello</div>
      );
    });

  return <>{renderInfo}</>;
};
