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

export const getSpellingDetail = (id: string | string[]) => {
  return axios
    .get("/api/spellings/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// search
export const getSearchResult = (searchText: string | string[]) => {
  return axios
    .get('/api/spellings?text="' + searchText + '"')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// main
export const getMainSpacingList = () => {
  return axios
    .get("/api/spacings")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getMainSpellingList = () => {
  return axios
    .get("/api/spellings")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
