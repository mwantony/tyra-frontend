import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
api.interceptors.request.use(
  (config) => {
    const restaurante = localStorage.getItem("restaurante");
    const token = JSON.parse(restaurante || "{}").token?.plainTextToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },    
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("restaurante");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
