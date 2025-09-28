// src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api", // Change to your backend URL if needed
  withCredentials: false, // Set to true if using cookies/sessions
});

export default api;
