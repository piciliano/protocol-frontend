import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.1.105:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

const checkTokenExpiration = (token: any) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expirationTime = payload.exp * 1000;
  const currentTime = Date.now();

  return currentTime >= expirationTime;
};

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("tokenProtocolApp");

    if (token) {
      if (checkTokenExpiration(token)) {
        localStorage.removeItem("tokenProtocolApp");
        window.location.href = "/login";
        return Promise.reject("Token expirado");
      }

      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
