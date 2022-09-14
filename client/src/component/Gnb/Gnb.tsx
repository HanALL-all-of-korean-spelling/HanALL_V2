import Link from "next/link";
import { UserNickname } from "../User/UserNickname";
import style from "./Gnb.module.scss";

export default function Gnb() {
  return (
    <div className={style.Gnb}>
      <div>
        <Link href="/" passHref>
          <div>메인</div>
        </Link>
        <Link href="/spelling" passHref>
          <div>철자 정보</div>
        </Link>
        <Link href="/spacing" passHref>
          <div>띄어쓰기 정보</div>
        </Link>
        <Link href="/qna" passHref>
          <div>문의 게시판</div>
        </Link>
        <Link href="/scrap" passHref>
          <div>보관함</div>
        </Link>
      </div>
      <UserNickname />
    </div>
  );
}
