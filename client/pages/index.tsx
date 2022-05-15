import type { NextPage } from "next";
import { MainInfoList } from "../src/component/MainPage/MainInfoList";
import { TodaySpelling } from "../src/component/MainPage/TodaySpelling";
import { SearchBar } from "../src/component/SearchBar";

const Home: NextPage = () => {
  return (
    <>
      <SearchBar />
      <TodaySpelling />
      <MainInfoList />
    </>
  );
};

export default Home;
