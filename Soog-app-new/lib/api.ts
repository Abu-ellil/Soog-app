import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.100:4000/api", // Replace with your actual backend IP
  timeout: 10000,
});