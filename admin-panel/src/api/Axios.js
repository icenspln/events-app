import axios from "axios";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

let token = localStorage.getItem("token");
if (token) Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

export default Axios;
