import Link from "next/link";
import { UserNickname } from "./User/UserNickname";

export default function Gnb() {
  return (
    <>
      <style jsx>{`
        div {
          display: flex;
          padding: 0.25rem 1rem;
          background-color: #ffde88;
          justify-content: space-between;
        }
      `}</style>
      <div>
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
    </>
  );
}
