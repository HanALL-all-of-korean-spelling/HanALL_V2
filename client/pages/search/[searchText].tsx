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

const Search: NextPage = () => {
  const [result, setResult] = useState<ISearch>();

  const router = useRouter();
  const { searchText } = router.query;

  const getData = async () => {
    if (searchText) {
      const search = await getSearchResult(searchText);
      setResult(search);
    }
  };

  useEffect(() => {
    getData();
  }, [searchText]);

  return (
    <>
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
    </>
  );
};

export default Search;
