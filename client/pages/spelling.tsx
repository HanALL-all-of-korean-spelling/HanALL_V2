import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";
import { getSpellingList } from "../src/services/user-service";
import { IPageList } from "../types";

const Spelling: NextPage = () => {
  const [spellings, setSpellings] = useState<IPageList>();
  const [sort, setSort] = useState<string>("created_at");

  const getData = async () => {
    const list = await getSpellingList(sort);
    setSpellings(list);
  };

  useEffect(() => {
    getData();
  }, [sort]);

  return <>{spellings && <InfoListPage list={spellings.result} />}</>;
};

export default Spelling;
