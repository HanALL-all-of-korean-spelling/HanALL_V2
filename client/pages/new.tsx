import type { NextPage } from "next";
import { useState } from "react";
import { InfoInputs } from "../types";
import { postSpacing, postSpelling } from "../src/services/user-service";
import { Button } from "../src/component/common/Button/Button";
import { Input } from "../src/component/common/Input/Input";

// 철자/띄어쓰기 새 정보 생성
const NewInfo: NextPage = () => {
  const initialValues: InfoInputs = {
    title: "",
    right_words: "",
    wrong_words: "",
    description: "",
    helpful_info: "",
  };
  const [inputs, setInputs] = useState<InfoInputs>(initialValues);
  const [selectedCategory, setSelectedCategory] = useState<string>("spelling");

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<any>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (selectedCategory === "spelling") {
      await postSpelling(inputs);
    } else {
      await postSpacing(inputs);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            defaultValue="spelling"
          >
            <option value="spelling">철자 정보</option>
            <option value="spacing">띄어쓰기 정보</option>
          </select>
          <Input
            name="title"
            onChange={handleInputChange}
            value={inputs.title}
            placeholder="제목을 입력해주세요."
          ></Input>
          <Input
            name="right_words"
            onChange={handleInputChange}
            value={inputs.right_words}
            placeholder="옳은 단어를 입력해주세요."
          ></Input>
          <Input
            name="wrong_words"
            onChange={handleInputChange}
            value={inputs.wrong_words}
            placeholder="틀린 단어를 입력해주세요."
          ></Input>
          <Input
            textArea
            name="description"
            onChange={handleInputChange}
            value={inputs.description}
            placeholder="설명을 입력해주세요."
          ></Input>
          <Input
            textArea
            name="helpful_info"
            onChange={handleInputChange}
            value={inputs.helpful_info}
            placeholder="이해를 위한 정보를 입력해주세요."
          ></Input>
        </div>
        <Button type="submit" fullWidth>
          등록하기
        </Button>
      </form>
    </div>
  );
};

export default NewInfo;
