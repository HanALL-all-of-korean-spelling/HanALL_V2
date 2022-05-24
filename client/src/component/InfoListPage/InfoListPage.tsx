import React, { useEffect, useState } from "react";
import { getSpellingList } from "../../services/user-service";

export const InfoListPage = () => {
  const [spellings, setSpellings] = useState<any[]>([]);
  const [sort, setSort] = useState<string>("created_at");

  useEffect(() => {
    async () => {
      const list = await getSpellingList(sort);
      setSpellings(list);
    };
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
