import Link from "next/link";

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
        <div>문의 게시판</div>
        <div>보관함</div>
      </div>
    </>
  );
}
