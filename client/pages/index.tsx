import type { GetServerSideProps, NextPage } from "next";
import {
  getMainSpacingList,
  getMainSpellingList,
  getTodayInfo,
} from "../src/services/user-service";
import { IMainList, IToday } from "../types";
import { MainInfo } from "../src/component/MainPage/MainInfo";
import { TodaySpelling } from "../src/component/MainPage/TodaySpelling";
import { SearchBar } from "../src/component/SearchPage/SearchBar";
import { MWContainer } from "../src/component/MWContainer/MWContainer";

const Home: NextPage<{
  todayInfo: IToday;
  spellingList: IMainList;
  spacingList: IMainList;
}> = ({ todayInfo, spellingList, spacingList }) => {
  return (
    <div>
      <style jsx>{`
        div {
          width: 60rem;
        }
      `}</style>
      <SearchBar />
      <MWContainer>
        <TodaySpelling todayInfo={todayInfo} />
        <MainInfo spellingList={spellingList} spacingList={spacingList} />
      </MWContainer>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const todayInfo = await getTodayInfo();
  const spellingList = await getMainSpellingList();
  const spacingList = await getMainSpacingList();
  return {
    props: {
      todayInfo,
      spellingList,
      spacingList,
    },
  };
};
