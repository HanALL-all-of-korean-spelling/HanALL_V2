import type { NextPage } from "next";
import { MainInfo } from "../src/component/MainPage/MainInfo";
import { TodaySpelling } from "../src/component/MainPage/TodaySpelling";
import { SearchBar } from "../src/component/SearchBar";

const Home: NextPage = () => {
  return (
    <>
      <SearchBar />
      <TodaySpelling />
      <hr />
      <MainInfo />
    </>
  );
};

export default Home;
