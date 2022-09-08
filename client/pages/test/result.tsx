import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppSelector } from "../../src/_app/hooks";
import { getTest } from "../../src/_reducer/testReducer";
import { Button } from "../../src/component/Button/Button";

const Result: NextPage = () => {
  const router = useRouter();
  const score = useAppSelector(getTest).score;

  return (
    <>
      <style jsx>{`
        div {
          margin-top: 5rem;
        }
      `}</style>
      <div>
        <div>당신의 점수는 {score * 10} 점!</div>
        <Button
          fullWidth
          onClick={() => {
            router.push("/scrap");
          }}
        >
          보관함으로 돌아가기
        </Button>
      </div>
    </>
  );
};

export default Result;
