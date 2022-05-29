import React, { useState } from "react";
import Link from "next/link";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <>
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
