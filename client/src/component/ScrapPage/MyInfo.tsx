import { useRouter } from "next/router";
import { IUser } from "../../../types/auth";
import { Button } from "../common/Button/Button";
import style from "./ScrapPage.module.scss";

export const MyInfo = ({ user, score }: { user: IUser; score?: number }) => {
  const router = useRouter();

  return (
    <>
      <div className={style.MyInfo}>
        {score && (
          <div>
            {user.nickname} 님의 점수는
            <strong>{score * 10}</strong>
            점!
          </div>
        )}
        <div>
          나의 총점:
          <strong>{user.point * 10}</strong>
        </div>
        <div>
          현재 등급:
          <strong>{user.rank}</strong>
        </div>
      </div>
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
    </>
  );
};
