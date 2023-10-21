import axios from "axios";
import { API_URL } from "../utils/constants";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 50000,
  headers: {
    Authorization: "Bearer ",
    "Content-Type": "application/json",
  },
});

export const get = (url, params) => {
  return instance.get(url, { params });
};

export const post = (url, data) => {
  return instance.post(url, data);
};

export const patch = (url, data) => {
  return instance.patch(url, data);
};

export default instance;
