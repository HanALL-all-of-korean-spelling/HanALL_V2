import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import style from "./SearchPage.module.scss";

export const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");

  return (
    <div className={style.SearchBar}>
      <Input
        placeholder="궁금한 맞춤법을 검색하세요"
        value={searchText}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setSearchText(e.target.value)
        }
        fullWidth
      ></Input>
      <Link href="/search/[searchText]" as={`/search/${searchText}`} passHref>
        <Button color="yellow">검색</Button>
      </Link>
    </div>
  );
};
