import axios from "axios";
import { BASE_URL } from "../utils/config";
import { getToken } from "../utils/storage";

const ClientApi= axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "authorization": `Bearer ${getToken()}`,
  },
});
const ClientFormDataApi= axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "multipart/form-data",
    "authorization": `Bearer ${getToken()}`,
  },
});

export { ClientFormDataApi };

export default ClientApi;