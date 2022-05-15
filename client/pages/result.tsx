import type { NextPage } from "next";
import { DetailPage } from "../src/component/DetailPage/DetailPage";
import { SearchBar } from "../src/component/SearchBar";
import { RightWrong } from "../src/component/SearchPage/RightWrong";
import { SimilarResults } from "../src/component/SearchPage/SimilarResults";

const SearchResult: NextPage = () => {
  return (
    <>
      <SearchBar />
      <RightWrong />
      <DetailPage />
      <SimilarResults />
    </>
  );
};

export default SearchResult;
