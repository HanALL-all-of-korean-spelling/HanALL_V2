import axios from "axios";
import { QuestionInputs } from "../../types";

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

export const postQuestions = (inputs: QuestionInputs) => {
  return axios
    .post("/api/questions", inputs)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
