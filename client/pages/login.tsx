import { useState } from "react";
import { login } from "../src/services/auth-service";
import { LoginInputs } from "../types/auth";
import Link from "next/link";

export default function Login() {
  const initialValues: LoginInputs = { email: "", password: "" };
  const [inputs, setInputs] = useState<LoginInputs>(initialValues);

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
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="ID"
        onChange={handleInputChange}
        value={inputs.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleInputChange}
        value={inputs.password}
      />
      <button type="submit">Login</button>
      <div>
        <div>한올이 처음이라면?</div>
        <Link href="/join">
          <div>회원가입하러 가기</div>
        </Link>
      </div>
    </form>
  );
}
