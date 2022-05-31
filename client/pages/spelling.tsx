import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";
import { getSpellingList } from "../src/services/user-service";
import { IList } from "../types";

const Spelling: NextPage = () => {
  const [spellings, setSpellings] = useState<IList[]>();
  const [sort, setSort] = useState<string>("created_at");

  const getData = async () => {
    const list = await getSpellingList(sort);
    setSpellings(list);
  };

  useEffect(() => {
    getData();
  }, [sort]);

  return <>{spellings && <InfoListPage list={spellings} />}</>;
};

export default Spelling;
