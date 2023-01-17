import axios from "axios";

/* file Instance */
export const fileAPI = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 100000,
  headers: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
});

/* interceptors */
fileAPI.interceptors.response.use(
  function (response) {
    // Status Code 200범위 내, 즉 성공했을때
    return response;
  },
  function (error) {
    // Status Code 200범위 밖, 즉 실패했을때
    if (error.response.status === 401 || error.response.satus === 406) {
      window.alert("다시 로그인이 필요합니다.");
      window.location.href = "/signin";
    }
    if (error.response.status === 403) {
      window.alert("권한이 없는 사용자입니다.");
    }
    if (error.response.status === 404) {
      window.alert("데이터를 찾을 수 없습니다.");
    }
    if (error.response.status === 500) {
      window.alert("서버 오류가 발생하였습니다.");
    }

    return Promise.reject(error);
  }
);