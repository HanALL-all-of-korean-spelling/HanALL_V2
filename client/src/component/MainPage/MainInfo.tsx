import Link from "next/link";
import { IMainList } from "../../../types";
import { InfoList } from "../InfoListPage/InfoList";
import { Button } from "../common/Button/Button";
import { Title } from "../common/Title/Title";
import { MWContainer } from "../common/MWContainer/MWContainer";
import style from "./MainPage.module.scss";

export const MainInfo = ({
  spellingList,
  spacingList,
}: {
  spellingList?: IMainList;
  spacingList?: IMainList;
}) => {
  const renderMainInfo = (list: IMainList, title: string, link: string) => {
    return (
      <div className={style.MainInfo}>
        <Link
          href={{
            pathname: link,
            query: { page: 1, sort: "hits" },
          }}
          passHref
        >
          <div>
            <Title color="black">{title}</Title>
            <Button color="white" outline>
              더보기
            </Button>
          </div>
        </Link>
        <div>
          <Title color="blueMargin" size="small">
            다른 사람들이 많이 봤어요!
          </Title>
          <InfoList list={list.hits_order} type="hits" />
          <Title color="blueMargin" size="small">
            새로 추가됐어요!
          </Title>
          <InfoList list={list.created_at_order} type="created_at" />
        </div>
      </div>
    );
  };

  return (
    <MWContainer tablet>
      {spellingList && renderMainInfo(spellingList, "철자", "/spelling")}
      {spacingList && renderMainInfo(spacingList, "띄어쓰기", "/spacing")}
    </MWContainer>
  );
};
