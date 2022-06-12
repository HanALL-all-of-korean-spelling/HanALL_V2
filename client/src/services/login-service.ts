import axios from "axios";
import Cookie from "js-cookie";
import router from "next/router";
import { LoginInputs } from "../../pages/login";

export const COOKIES = {
  authToken: "myApp.authToken",
};

export async function login(inputs: LoginInputs): Promise<string | void> {
  return await axios
    .post("/api/auth/login", inputs)
    .then((res) => {
      //로그인 성공
      if (res.status === 200) {
        const { token } = res.data;
        console.log(res)
        console.log(token)
        Cookie.set(COOKIES.authToken, token);
        router.push("/");
      } else if (!res.data || !res.data.token) {
        return "Something went wrong!";
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
