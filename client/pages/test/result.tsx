import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelector } from "../../src/_app/hooks";
import { getTest } from "../../src/_reducer/testReducer";
import { getUser } from "../../src/_reducer/userReducer";
import { Button } from "../../src/component/Button/Button";
import { MyInfo } from "../../src/component/ScrapPage/MyInfo";
import css from "styled-jsx/css";

const Result: NextPage = () => {
  const router = useRouter();
  const score = useAppSelector(getTest).score;
  const user = useAppSelector(getUser).user;

  return (
    <div>
      <style jsx>{style}</style>
      {user && <MyInfo user={user} score={score} />}
      <Button
        fullWidth
        color="lightPink"
        shadow
        onClick={() => {
          router.push("/scrap");
        }}
      >
        보관함으로 돌아가기
      </Button>
    </div>
  );
};

const style = css`
  div:first-child {
    margin-top: 5rem;
  }
`;

export default Result;
