import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { TestList } from "../src/component/ScrapPage/TestList";
import { getTestList } from "../src/services/auth-service";
import { ITest } from "../types";

const Test: NextPage = () => {
  const [quizzes, setQuizzes] = useState<ITest[]>();
  const getData = async () => {
    const list = await getTestList();
    setQuizzes(list);
  };

  useEffect(() => {
    getData();
  }, []);

  return <>{quizzes && <TestList quizzes={quizzes} />}</>;
};

export default Test;
