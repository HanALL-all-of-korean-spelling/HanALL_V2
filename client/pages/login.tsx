import { useState } from "react";
import { login } from "../src/services/login-service";

export type LoginInputs = {
  email: string;
  password: string;
};

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
    </form>
  );
}
