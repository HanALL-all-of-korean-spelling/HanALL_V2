import axios from "axios";
import Cookie from "js-cookie";
import router from "next/router";
import { LoginInputs } from "../../types/auth";

export const COOKIES = {
  authToken: "myApp.authToken",
};

// auth
export async function join(inputs: LoginInputs) {
  return await axios
    .post("/api/auth/join", inputs)
    .then((res) => {
      //회원가입 성공
      if (res.status === 200) {
        router.push("/login");
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

export async function login(inputs: LoginInputs) {
  return await axios
    .post("/api/auth/login", inputs)
    .then((res) => {
      //로그인 성공
      if (res.status === 200) {
        const { token } = res.data;
        Cookie.set(COOKIES.authToken, token);
        router.push("/");
        return res;
      } else if (!res.data || !res.data.token) {
        return "Something went wrong!";
      }
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}

export const logout = async () => {
  Cookie.remove(COOKIES.authToken);
  console.log("logout");
  await router.push("/login");
};

// users
export const getUserInfo = async () => {
  const cookie = Cookie.get(COOKIES.authToken);
  if (cookie) {
    return axios
      .get("/api/users", {
        headers: {
          token: cookie,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const getScrapList = () => {
  const cookie = Cookie.get(COOKIES.authToken);
  if (cookie) {
    return axios
      .get("/api/users/scraps", {
        headers: {
          token: cookie,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const getTestList = () => {
  const cookie = Cookie.get(COOKIES.authToken);
  if (cookie) {
    return axios
      .get("/api/users/tests", {
        headers: {
          token: cookie,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};

export const putTestResult = (score: number) => {
  const cookie = Cookie.get(COOKIES.authToken);
  if (cookie) {
    return axios
      .put(
        "/api/users/tests",
        { point: score },
        {
          headers: {
            token: cookie,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
