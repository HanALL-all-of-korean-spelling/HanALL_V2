import axios from "axios";

// questions
export const getQuestions = (page: number) => {
  return axios
    .get("/api/questions?page=" + page)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
