import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div>
      <Input
        placeholder="궁금한 맞춤법을 검색하세요"
        value={searchText}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setSearchText(e.target.value)
        }
      ></Input>
      <Link href="/search/[searchText]" as={`/search/${searchText}`}>
        <Button color="yellow">검색</Button>
      </Link>
    </div>
  );
};
