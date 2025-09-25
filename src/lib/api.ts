import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // kalau pakai prefix /api → ubah ke http://localhost:3001/api
});

// Interceptor → tambahkan token di Authorization header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
