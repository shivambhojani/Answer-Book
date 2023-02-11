//author - Aman Singh BHandari
import axios from "axios";

const httpClient = axios.create({
  //common functionality to call all the apis in our app
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000"
      : process.env.REACT_APP_SERVER_BASE_URL,
});

httpClient.interceptors.request.use(async function (config) {
  //   const token = localStorage.getItem("auth-token");
  //   if (token) {
  //     config.headers["Authorization"] = "Bearer " + token;
  //   }

  return config;
});

httpClient.interceptors.response.use(
  async function (config) {
    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

export default httpClient;
