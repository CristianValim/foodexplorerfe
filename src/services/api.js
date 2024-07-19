import axios from "axios";

export const api = axios.create({
  baseURL: "https://foodexplorer-api-a607.onrender.com",
});