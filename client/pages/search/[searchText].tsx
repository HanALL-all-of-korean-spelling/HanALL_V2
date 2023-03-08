import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ISearch } from "../../types";
import { getSearchResult } from "../../src/services/user-service";
import { DetailPage } from "../../src/component/DetailPage/DetailPage";
import { RightWrong } from "../../src/component/SearchPage/RightWrong";
import { SimilarResults } from "../../src/component/SearchPage/SimilarResults";
import { Button } from "../../src/component/common/Button/Button";
import { OutlineBox } from "../../src/component/common/OutlineBox/OutlineBox";
import { MWContainer } from "../../src/component/common/MWContainer/MWContainer";
import { SearchBar } from "../../src/component/SearchPage/SearchBar";

// const Search: NextPage<{ result?: ISearch }> = ({ result }) => {
const Search: NextPage = () => {
  const router = useRouter();
  const searchText = router.query.searchText as string;

  const [result, setResult] = useState<ISearch>();

  useEffect(() => {
    const getData = async () => {
      const search = await getSearchResult(searchText);
      setResult(search);
    };
    getData();
  }, [searchText]);

  return (
    <div>
      <SearchBar initialText={searchText} />
      {result?.detail ? (
        <div>
          <RightWrong result={result} />
          <MWContainer>
            <OutlineBox>
              <DetailPage detailInfo={result.detail?._source} />
            </OutlineBox>
            <SimilarResults result={result} />
          </MWContainer>
        </div>
      ) : (
        <div>
          <div>검색 결과가 없습니다.</div>
          <Button onClick={() => router.push("/")}>메인으로 가기</Button>
        </div>
      )}
    </div>
  );
};

export default Search;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const searchText = context.params?.searchText as string;
//   const result = await getSearchResult(searchText);
//   return {
//     props: {
//       result,
//     },
//   };
// };
