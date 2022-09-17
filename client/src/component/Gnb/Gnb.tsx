import Link from "next/link";
import { useState } from "react";
import { UserNickname } from "../User/UserNickname";
import style from "./Gnb.module.scss";

export default function Gnb() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={style.Gnb}>
      <div className={style.menu} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <>메뉴 닫기</> : <>메뉴 열기</>}
      </div>
      <div className={`${style.List} ${isOpen ? style.Open : style.Close}`}>
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
