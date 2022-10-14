import Link from "next/link";
import style from "./SelectSort.module.scss";

export const SelectSort = ({ sort, page }: { sort: string; page: number }) => {
  return (
    <div className={style.SelectSort}>
      <Link href={{ query: { page: page, sort: "hits" } }} passHref>
        <div className={sort === "hits" ? style.bold : style.normal}>
          조회수순
        </div>
      </Link>
      <Link href={{ query: { page: page, sort: "scraps" } }} passHref>
        <div className={sort === "scraps" ? style.bold : style.normal}>
          스크랩순
        </div>
      </Link>
      <Link href={{ query: { page: page, sort: "created_at" } }} passHref>
        <div className={sort === "created_at" ? style.bold : style.normal}>
          최신순
        </div>
      </Link>
    </div>
  );
};
