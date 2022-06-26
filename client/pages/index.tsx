import type { NextPage } from "next";
import { MainInfo } from "../src/component/MainPage/MainInfo";
import { TodaySpelling } from "../src/component/MainPage/TodaySpelling";
import { SearchBar } from "../src/component/SearchPage/SearchBar";

const Home: NextPage = () => {
  return (
    <div className="flex-col">
      <SearchBar />
      <div className="flex-between">
        <TodaySpelling />
        <MainInfo />
      </div>
    </div>
  );
};

export default Home;
