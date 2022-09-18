import axios from "axios";
import router from "next/router";
import { LoginInputs } from "../../types/auth";

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
      return error.response;
    });
}

export async function login(inputs: LoginInputs) {
  return await axios
    .post("/api/auth/login", inputs)
    .then((res) => {
      //로그인 성공
      if (res.status === 200) {
        const token = res.data.token;
        // axios 헤더에 토큰 담아 보내기
        axios.defaults.headers.common["Authorization"] = token;
        router.push("/");
        return res;
      } else if (!res.data || !res.data.token) {
        return "Something went wrong!";
      }
    })
    .catch((error) => {
      return error.response;
    });
}

export const logout = async () => {
  return await axios.get("/api/auth/logout").then((res) => {
    //로그아웃 성공
    if (res.status === 200) {
      console.log("logout");
    }
  });
};

// users
export const getUserInfo = async () => {
  return axios
    .get("/api/users", {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getScrapList = () => {
  return axios
    .get("/api/users/scraps", {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getTestList = () => {
  return axios
    .get("/api/users/tests", {})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

export const putTestResult = (score: number) => {
  return axios
    .put("/api/users/tests", { point: score })
    .then((response) => {
      if (response.status === 200) {
        router.push("/test/result");
        return response.data;
      }
    })
    .catch((error) => {
      return error.response;
    });
};
