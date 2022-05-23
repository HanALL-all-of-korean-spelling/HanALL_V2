import React, { useEffect, useState } from "react";
import axios from "axios";

export const InfoListPage = () => {
  const [spellings, setSpellings] = useState<any[]>([]);

  const getData = async () => {
    await axios.get("/api/spellings?sort=created_at").then((response) => {
      console.log(response.data);
      setSpellings(response.data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

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
