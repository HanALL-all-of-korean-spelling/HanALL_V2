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

export const scrapSpacing = (id: string | string[]) => {
  return axios
    .put("/api/spacings/" + id + "/scraps")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 400 && error.response.data) {
        alert("이미 스크랩한 글입니다");
      }
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

export const scrapSpelling = (id: string | string[]) => {
  return axios
    .put("/api/spellings/" + id + "/scraps")
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response.status === 400 && error.response.data) {
        alert("이미 스크랩한 글입니다");
      }
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

// today
export const getTodayInfo = () => {
  return axios
    .get("/api/todays")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
