import React, { useState } from "react";
import Link from "next/link";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <>
      <style jsx>{`
        input {
          padding: 15px;
          width: 60%;
          margin: 30px;
          border: 4px solid #ffde88;
          border-radius: 20px;
        }
        button {
          background-color: #ffde88;
          border: none;
          border-radius: 10px;
          padding: 15px;
          margin-left: 5px;
        }
      `}</style>
      <input
        placeholder="궁금한 맞춤법을 검색하세요"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></input>
      <Link href="/search/[searchText]" as={`/search/${searchText}`}>
        <button>검색</button>
      </Link>
    </>
  );
};
