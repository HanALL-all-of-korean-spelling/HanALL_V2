import type { NextPage } from "next";
import { MainInfo } from "../src/component/MainPage/MainInfo";
import { TodaySpelling } from "../src/component/MainPage/TodaySpelling";
import { SearchBar } from "../src/component/SearchPage/SearchBar";
import { MWContainer } from "../src/component/MWContainer/MWContainer";

const Home: NextPage = () => {
  return (
    <div>
      <style jsx>{`
        div {
          width: 60rem;
        }
      `}</style>
      <SearchBar />
      <MWContainer>
        <TodaySpelling />
        <MainInfo />
      </MWContainer>
    </div>
  );
};

export default Home;
