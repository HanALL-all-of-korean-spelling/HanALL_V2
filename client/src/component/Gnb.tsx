import Link from "next/link";
import { UserNickname } from "./User/UserNickname";

export default function Gnb() {
  return (
    <>
      <style jsx>{`
        div {
          display: flex;
          margin: 0.5rem 1rem;
        }
      `}</style>
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
        <UserNickname />
      </div>
    </>
  );
}
