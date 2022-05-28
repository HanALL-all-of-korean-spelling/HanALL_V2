import axios from "axios";

// spacing
export const getSpacingList = (sort: string) => {
  return axios
    .get("/api/spacings?sort=" + sort)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getSpacingDetail = (id: string) => {
  return axios
    .get("/api/spacings/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// spelling
export const getSpellingList = (sort: string) => {
  return axios
    .get("/api/spellings?sort=" + sort)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getSpellingDetail = (id: string) => {
  return axios
    .get("/api/spellings/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
