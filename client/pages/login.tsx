import { useState } from "react";
import Link from "next/link";
import { getUserInfo, login } from "../src/services/auth-service";
import { useAppDispatch } from "../src/_app/hooks";
import { setUser } from "../src/_reducer/userReducer";
import { LoginInputs } from "../types/auth";
import { Input } from "../src/component/Input/Input";
import { Button } from "../src/component/Button/Button";
import { AlertToast } from "../src/component/AlertToast/AlertToast";

export default function Login() {
  const initialValues: LoginInputs = { email: "", password: "" };
  const [inputs, setInputs] = useState<LoginInputs>(initialValues);
  const [isAlert, setIsAlert] = useState(false);
  const dispatch = useAppDispatch();

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await login(inputs);
    if (res) {
      const userInfo = await getUserInfo();
      dispatch(setUser(userInfo));
    }
    if (res?.status === 500) {
      setIsAlert(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <style jsx>{`
        .LoginCont {
          display: flex;
          height: 90vh;
          align-items: center;
          justify-content: center;
          align-content: center;
          flex-direction: column;
          margin: 5px 0px;
        }
      `}</style>
      <div className="LoginCont">
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
        <Button type="submit">Login</Button>
        <div>
          <div>한올이 처음이라면?</div>
          <Link href="/join" passHref>
            <div>회원가입하러 가기</div>
          </Link>
        </div>
        {isAlert && (
          <AlertToast message="아이디나 비밀번호가 일치하지 않습니다." />
        )}
      </div>
    </form>
  );
}
