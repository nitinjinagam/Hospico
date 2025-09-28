// src/api/specializationApi.js
import api from "./axios";

export const fetchSpecializations = async () => {
  const response = await api.get("/specializations");
  return response.data;
};

