import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { getTestList } from "../src/services/auth-service";
import { ITest } from "../types";

const Test: NextPage = () => {
  const [scraps, setScraps] = useState<ITest[]>();
  const getData = async () => {
    const list = await getTestList();
    setScraps(list);
  };
  console.log(scraps);

  useEffect(() => {
    getData();
  }, []);

  return <div>test</div>;
};

export default Test;
