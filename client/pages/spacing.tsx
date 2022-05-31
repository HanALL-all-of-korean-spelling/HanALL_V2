import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { InfoListPage } from "../src/component/InfoListPage/InfoListPage";
import { getSpacingList } from "../src/services/user-service";
import { IList } from "../types";

const Spacing: NextPage = () => {
  const [spacings, setSpacings] = useState<IList[]>();
  const [sort, setSort] = useState<string>("created_at");

  const getData = async () => {
    const list = await getSpacingList(sort);
    console.log(list);
    setSpacings(list);
  };

  useEffect(() => {
    getData();
  }, [sort]);

  return <>{spacings && <InfoListPage list={spacings} />}</>;
};

export default Spacing;
