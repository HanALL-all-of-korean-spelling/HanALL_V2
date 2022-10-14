import type { NextPage } from "next";
import { useAppSelector } from "../../src/_app/hooks";
import { getTest } from "../../src/_reducer/testReducer";
import { getUser } from "../../src/_reducer/userReducer";
import { MyInfo } from "../../src/component/ScrapPage/MyInfo";

const Result: NextPage = () => {
  const score = useAppSelector(getTest).score;
  const user = useAppSelector(getUser).user;

  return <div>{user && <MyInfo user={user} score={score} />}</div>;
};

export default Result;
