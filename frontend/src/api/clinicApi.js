// src/api/clinicApi.js
import api from "./axios";

// Get clinics (with optional filters)
export const fetchClinics = async (city, specialization) => {
  let url = "/clinics";
  const params = {};
  if (city) params.city = city;
  if (specialization) params.specialization = specialization;
  const response = await api.get(url, { params });
  return response.data;
};

// Get nearby clinics
export const fetchNearbyClinics = async (lat, lng) => {
  const response = await api.get("/clinics/nearby", { params: { lat, lng } });
  return response.data;
};

// Get single clinic by ID (needed for ClinicDetails.jsx)
export const fetchClinicById = async (clinicId) => {
  const response = await api.get(`/clinics/${clinicId}`);
  return response.data;
};

// Create clinic
export const createClinic = async (clinicData) => {
  const response = await api.post("/clinics", clinicData);
  return response.data;
};

// Delete clinic
export const deleteClinic = async (clinicId) => {
  const response = await api.delete(`/clinics/${clinicId}`);
  return response.data;

// Missing update clinic
};
