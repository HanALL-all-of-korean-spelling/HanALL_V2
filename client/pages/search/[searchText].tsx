import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ISearch } from "../../types";
import { getSearchResult } from "../../src/services/user-service";
import { DetailPage } from "../../src/component/DetailPage/DetailPage";
import { RightWrong } from "../../src/component/SearchPage/RightWrong";
import { SimilarResults } from "../../src/component/SearchPage/SimilarResults";
import { Button } from "../../src/component/Button/Button";
import { OutlineBox } from "../../src/component/OutlineBox/OutlineBox";
import { MWContainer } from "../../src/component/MWContainer/MWContainer";
import { SearchBar } from "../../src/component/SearchPage/SearchBar";

const Search: NextPage = () => {
  const [result, setResult] = useState<ISearch>();

  const router = useRouter();
  const searchText = String(router.query.searchText);

  useEffect(() => {
    const getData = async () => {
      if (searchText) {
        const search = await getSearchResult(searchText);
        setResult(search);
      }
    };
    getData();
  }, [searchText]);

  return (
    <div>
      <SearchBar initialText={searchText} />
      {result && result.detail ? (
        <div>
          <RightWrong result={result} />
          <MWContainer>
            <OutlineBox>
              <DetailPage id={result.detail._id} />
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
