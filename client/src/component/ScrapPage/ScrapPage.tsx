import { useAppSelector } from "../../_app/hooks";
import { getUser } from "../../_reducer/userReducer";
import { MyInfo } from "./MyInfo";
import { ScrapInfo } from "./ScrapInfo";
import style from "./ScrapPage.module.scss";

export const ScrapPage = () => {
  const user = useAppSelector(getUser).user;
  return (
    <div className={style.ScrapPage}>
      {user ? (
        <div>
          <MyInfo user={user} />
          <ScrapInfo />
        </div>
      ) : (
        <div>로그인하고 보관함에 기억하고 싶은 맞춤법을 저장해 보세요!</div>
      )}
    </div>
  );
};
