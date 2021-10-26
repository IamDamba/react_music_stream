import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV
    ? process.env.REACT_APP_BASE_URL_LOCAL
    : process.env.REACT_APP_BASE_URL_PUBLIC,
});
