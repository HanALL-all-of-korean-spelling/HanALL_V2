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
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      return error;
    });
};

export const getQuestionDetail = (id: string) => {
  return axios
    .get("/api/questions/" + id)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putQuestionDetail = (id: string, inputs: QuestionInputs) => {
  return axios
    .put("/api/questions/" + id, inputs)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteQuestionDetail = (id: string) => {
  return axios
    .delete("/api/questions/" + id)
    .then((response) => {
      if (response.status === 204) {
        return "success";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// answer
export const postAnswer = (id: string, input: string) => {
  return axios
    .post("/api/answers", { question_id: id, answer: input })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const putAnswer = (id: string, input: string) => {
  return axios
    .put("/api/answers/" + id, { answer: input })
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteAnswer = (id: string) => {
  return axios
    .delete("/api/answers/" + id)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
