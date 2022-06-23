import Link from "next/link";
import { UserNickname } from "../User/UserNickname";
import style from "./Gnb.module.scss";

export default function Gnb() {
  return (
    <div className={style.Gnb}>
      <div>
        <Link href="/">
          <div>메인</div>
        </Link>
        <Link href="/spelling">
          <div>철자 정보</div>
        </Link>
        <Link href="/spacing">
          <div>띄어쓰기 정보</div>
        </Link>
        <Link href="/qna">
          <div>문의 게시판</div>
        </Link>
        <Link href="/scrap">
          <div>보관함</div>
        </Link>
      </div>
      <UserNickname />
    </div>
  );
}
