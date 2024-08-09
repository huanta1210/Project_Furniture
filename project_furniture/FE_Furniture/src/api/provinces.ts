import axios from "axios";

const instanceProvinces = axios.create({
  baseURL: "https://esgoo.net/api-tinhthanh/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000,
});

export default instanceProvinces;
