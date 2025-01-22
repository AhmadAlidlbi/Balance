import axios from "axios";
import { BASE_URL } from "../utils/config";
import { getToken } from "../utils/storage";

// Create an Axios instance with headers set dynamically
const ClientApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the token to headers dynamically
ClientApi.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Get the token asynchronously
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const ClientFormDataApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Interceptor for ClientFormDataApi
ClientFormDataApi.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Get the token asynchronously
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { ClientFormDataApi };
export default ClientApi;
