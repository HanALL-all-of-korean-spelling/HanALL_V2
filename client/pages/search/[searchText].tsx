import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { getSearchResult } from "../../src/services/user-service";
import { DetailPage } from "../../src/component/DetailPage/DetailPage";
import { RightWrong } from "../../src/component/SearchPage/RightWrong";
import { SimilarResults } from "../../src/component/SearchPage/SimilarResults";
import { ISearch } from "../../types";

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
      <style jsx>{`
        .cont {
          width: 40rem;
        }
        .rightWrong {
          justify-content: center;
          display: flex;
          margin: 2rem;
        }
      `}</style>
      {result && (
        <div className="flex-col cont">
          <div className="rightWrong">
            <RightWrong result={result} />
          </div>
          <div className="flex-between">
            <DetailPage id={result.detail._id} />
            <SimilarResults result={result} />
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
