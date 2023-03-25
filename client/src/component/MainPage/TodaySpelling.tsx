import Link from "next/link";
import { IToday } from "../../../types";
import { OutlineBox } from "../common/OutlineBox/OutlineBox";
import { Title } from "../common/Title/Title";
import { RelatedInfo } from "../DetailPage/RelatedInfo";
import style from "./MainPage.module.scss";

export const TodaySpelling = ({ todayInfo }: { todayInfo?: IToday }) => {
  return (
    <div>
      {todayInfo && (
        <OutlineBox>
          <div className={style.TodaySpelling}>
            <Title color="black">오늘의 맞춤법</Title>
            <Link href="/detail/[id]" as={`/detail/${todayInfo._id}`} passHref>
              <a>
                <Title size="mid">{todayInfo._source.title}</Title>
                <div>😄 옳은 표현: {todayInfo._source.right_words}</div>
              </a>
            </Link>
            <div>
              <div>{todayInfo._source.description}</div>
              <div>{todayInfo._source.helpful_info}</div>
            </div>
            {todayInfo._source.related && (
              <RelatedInfo related={todayInfo._source.related} />
            )}
          </div>
        </OutlineBox>
      )}
    </div>
  );
};
