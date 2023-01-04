import type { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import {
  getMainSpacingList,
  getMainSpellingList,
  getTodayInfo,
} from "../src/services/user-service";
import { IMainList, IToday } from "../types";
import { MainInfo } from "../src/component/MainPage/MainInfo";
import { TodaySpelling } from "../src/component/MainPage/TodaySpelling";
import { SearchBar } from "../src/component/SearchPage/SearchBar";
import { MWContainer } from "../src/component/common/MWContainer/MWContainer";

// const Home: NextPage<{
//   todayInfo: IToday;
//   spellingList: IMainList;
//   spacingList: IMainList;
// }> = ({ todayInfo, spellingList, spacingList }) => {
const Home = () => {
  const [todayInfo, setTodayInfo] = useState();
  const [spellings, setSpellings] = useState<IMainList>();
  const [spacings, setSpacings] = useState<IMainList>();

  useEffect(() => {
    const getData = async () => {
      const today = await getTodayInfo();
      const spellingList = await getMainSpellingList();
      const spacingList = await getMainSpacingList();
      setTodayInfo(today);
      setSpellings(spellingList);
      setSpacings(spacingList);
    };
    getData();
  }, []);

  return (
    <div>
      <style jsx>{`
        div {
          width: 60rem;
        }
      `}</style>
      <SearchBar showLogo />
      <MWContainer>
        <TodaySpelling todayInfo={todayInfo} />
        <MainInfo spellingList={spellings} spacingList={spacings} />
      </MWContainer>
    </div>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const todayInfo = await getTodayInfo();
//   const spellingList = await getMainSpellingList();
//   const spacingList = await getMainSpacingList();
//   return {
//     props: {
//       todayInfo,
//       spellingList,
//       spacingList,
//     },
//   };
// };
