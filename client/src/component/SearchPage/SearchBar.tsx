import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import style from "./SearchPage.module.scss";

export const SearchBar = ({ initialText }: { initialText?: string }) => {
  if (!initialText) {
    initialText = "";
  }
  const [searchText, setSearchText] = useState<string>(initialText);

  return (
    <form onSubmit={(e) => e.preventDefault()} className={style.SearchBar}>
      <Input
        placeholder="궁금한 맞춤법을 검색하세요"
        value={searchText}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setSearchText(e.target.value)
        }
        fullWidth
      ></Input>
      <Link href="/search/[searchText]" as={`/search/${searchText}`} passHref>
        <Button type="submit" color="yellow">
          검색
        </Button>
      </Link>
    </form>
  );
};
