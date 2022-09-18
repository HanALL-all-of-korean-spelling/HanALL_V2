import Link from "next/link";
import { useState } from "react";
import { UserNickname } from "../User/UserNickname";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import style from "./Gnb.module.scss";

export default function Gnb() {
  const [isOpen, setIsOpen] = useState(false);
  const onClickClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.Gnb}>
      <div className={style.menu} onClick={onClickClose}>
        <ListRoundedIcon />
      </div>
      <div
        className={`${style.List} ${isOpen ? style.Open : style.Close}`}
        onClick={onClickClose}
      >
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
      <div className={`${isOpen && style.Open}`}>
        <UserNickname />
      </div>
    </div>
  );
}
