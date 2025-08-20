import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
});

export default instance;
