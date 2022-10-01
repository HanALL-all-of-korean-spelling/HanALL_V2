import axios from "axios";
import { InfoInputs } from "../../types";

const baseUrl = "http://hanall.site";

const requestGet = (url: string) => {
  return axios
    .get(baseUrl + "/api" + url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const requestPost = (url: string, body: any) => {
  return axios
    .post("/api" + url, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const requestPut = (url: string, body?: any) => {
  return axios
    .put("/api" + url, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
    });
};

const requestDelete = (url: string) => {
  return axios
    .delete("/api" + url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// spacing
export const getSpacingList = (sort: string, page: number) => {
  return requestGet("/spacings?sort=" + sort + "&page=" + page);
};

export const postSpacing = (inputs: InfoInputs) => {
  return requestPost("/spacings", inputs);
};

export const getSpacingDetail = (id: string) => {
  return requestGet("/spacings/" + id);
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
  return requestPut("/spacings/" + id, body);
};

export const deleteSpacingDetail = (id: string) => {
  return requestDelete("/spacings/" + id);
};

export const scrapSpacing = (id: string) => {
  return requestPut("/spacings/" + id + "/scraps");
};

// spelling
export const getSpellingList = (sort: string, page: number) => {
  return requestGet("/spellings?sort=" + sort + "&page=" + page);
};

export const postSpelling = (inputs: InfoInputs) => {
  return requestPost("/spellings", inputs);
};

export const getSpellingDetail = (id: string) => {
  return requestGet("/spellings/" + id);
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
  return requestPut("/spellings/" + id, body);
};

export const deleteSpellingDetail = (id: string) => {
  return requestDelete("/spellings/" + id);
};

export const scrapSpelling = (id: string) => {
  return requestPut("/spellings/" + id + "/scraps");
};

// search
export const getSearchResult = (searchText: string) => {
  return requestGet('/spellings?text="' + encodeURI(searchText) + '"');
};

// main
export const getMainSpacingList = () => {
  return requestGet("/spacings");
};

export const getMainSpellingList = () => {
  return requestGet("/spellings");
};

// today
export const getTodayInfo = () => {
  return requestGet("/todays");
};
