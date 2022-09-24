import axios from "axios";
import { InfoInputs } from "../../types";

// spacing
export const getSpacingList = (sort: string, page: number) => {
  return axios
    .get("/api/spacings?sort=" + sort + "&page=" + page)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postSpacing = (inputs: InfoInputs) => {
  return axios
    .post("/api/spacings", inputs)
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

export const updateSpacingDetail = (
  id: string,
  title: string,
  right_words: string,
  wrong_words: string,
  helpful_info: string
) => {
  const body = {
    title: title,
    right_words: right_words,
    wrong_words: wrong_words,
    helpful_info: helpful_info,
  };
  return axios
    .put("/api/spacings/" + id, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteSpacingDetail = (id: string) => {
  return axios
    .delete("/api/spacings/" + id)
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
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
    });
};

// spelling
export const getSpellingList = (sort: string, page: number) => {
  return axios
    .get("/api/spellings?sort=" + sort + "&page=" + page)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const postSpelling = (inputs: InfoInputs) => {
  return axios
    .post("/api/spellings", inputs)
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

export const updateSpellingDetail = (
  id: string,
  title: string,
  right_words: string,
  wrong_words: string,
  helpful_info: string
) => {
  const body = {
    title: title,
    right_words: right_words,
    wrong_words: wrong_words,
    helpful_info: helpful_info,
  };
  return axios
    .put("/api/spellings/" + id, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const deleteSpellingDetail = (id: string) => {
  return axios
    .delete("/api/spellings/" + id)
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
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response;
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
