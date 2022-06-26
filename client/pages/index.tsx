import type { NextPage } from "next";
import { MainInfo } from "../src/component/MainPage/MainInfo";
import { TodaySpelling } from "../src/component/MainPage/TodaySpelling";
import { SearchBar } from "../src/component/SearchPage/SearchBar";

const Home: NextPage = () => {
  return (
    <>
      <style jsx>{`
        div {
          width: 60rem;
          margin: 4rem 0;
        }
      `}</style>
      <div className="flex-col">
        <SearchBar />
        <div className="flex-between">
          <TodaySpelling />
          <MainInfo />
        </div>
      </div>
    </>
  );
};

export default Home;
