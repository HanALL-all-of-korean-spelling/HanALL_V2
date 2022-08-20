import type { NextPage } from "next";
import { useState } from "react";
import { InfoInputs } from "../types";
import { postSpacing } from "../src/services/user-service";
import { Button } from "../src/component/Button/Button";
import { Input } from "../src/component/Input/Input";

// 철자/띄어쓰기 새 정보 생성
const NewInfo: NextPage = () => {
  const initialValues: InfoInputs = {
    title: "",
    right_words: "",
    wrong_words: "",
    helpful_info: "",
  };
  const [inputs, setInputs] = useState<InfoInputs>(initialValues);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await postSpacing(inputs);
    console.log(res);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
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
