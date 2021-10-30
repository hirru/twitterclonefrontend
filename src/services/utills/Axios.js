import axios from "axios";
import { BASE_URL } from "../constants/Index";

// Axios configuration
const configuration = axios.create({
  baseURL: BASE_URL,
  headers: {
    // Authorization,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

configuration.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }

    config.headers["Access-Control-Allow-Origin"] = "*";

    return config;
  },
  (error) => Promise.reject(error)
);

export default configuration;
