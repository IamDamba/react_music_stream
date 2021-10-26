import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_BASE_URL_PUBLIC
      : process.env.REACT_APP_BASE_URL_LOCAL,
});
