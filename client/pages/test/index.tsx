import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ITest } from "../../types";
import { getTestList } from "../../src/services/auth-service";
import { TestList } from "../../src/component/ScrapPage/TestList";

const Test: NextPage = () => {
  const [quizzes, setQuizzes] = useState<ITest[]>();
  const getData = async () => {
    const list = await getTestList();
    setQuizzes(list);
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>{quizzes && <TestList quizzes={quizzes} />}</div>;
};

export default Test;
