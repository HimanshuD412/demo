import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

// REQUEST: attach token
api.interceptors.request.use(config => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = "Bearer " + user.token;
  }
  return config;
});

// RESPONSE: handle expiry
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      alert("Session expired or access denied. Please login again.");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);


export default api;
