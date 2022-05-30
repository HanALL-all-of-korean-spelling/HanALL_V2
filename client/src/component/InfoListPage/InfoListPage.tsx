import React, { useEffect, useState } from "react";
import { IList } from "../../../types";
import { getSpellingList } from "../../services/user-service";

export const InfoListPage = () => {
  const [spellings, setSpellings] = useState<IList[]>();
  const [sort, setSort] = useState<string>("created_at");

  const getData = async () => {
    const list = await getSpellingList(sort);
    console.log(list);
    setSpellings(list);
  };

  useEffect(() => {
    getData();
  }, [sort]);

  const renderSpellings =
    spellings &&
    spellings.map((spelling) => {
      return (
        <div key={spelling._id}>
          <div>{spelling._source.title}</div>
          <div>{spelling._source.hits}</div>
          <div>{spelling._source.created_at}</div>
        </div>
      );
    });

  return <>{renderSpellings}</>;
};
