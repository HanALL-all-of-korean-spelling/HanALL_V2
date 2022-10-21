import { FormEvent, useState } from "react";
import { JoinInputs } from "../../../types/auth";
import { join } from "../../services/auth-service";
import { AlertToast } from "../common/AlertToast/AlertToast";
import { Button } from "../common/Button/Button";
import { Input } from "../common/Input/Input";
import style from "./User.module.scss";

export const JoinForm = () => {
  const initialValues: JoinInputs = { email: "", password: "", nickname: "" };
  const [inputs, setInputs] = useState<JoinInputs>(initialValues);
  const [isAlert, setIsAlert] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await join(inputs);
    if (res?.data === "이미 가입하셨습니다.") {
      setIsAlert(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.JoinForm}>
      <Input
        type="email"
        name="email"
        placeholder="email"
        onChange={handleInputChange}
        value={inputs.email}
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
        value={inputs.password}
        required
        minLength={8}
      />
      <Input
        type="nickname"
        name="nickname"
        placeholder="nickname"
        onChange={handleInputChange}
        value={inputs.nickname}
        required
      />
      <Button type="submit">join</Button>
      {isAlert && <AlertToast message="이미 가입된 이메일입니다." />}
    </form>
  );
};
