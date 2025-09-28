// src/api/doctorApi.js
import api from "./axios";

// Get doctors by clinic and specialization
export const fetchDoctorsByClinicAndSpecialization = async (clinicId, specialization) => {
  const response = await api.get(`/clinics/${clinicId}/doctors`, { params: { specialization } });
  return response.data;
};

// Add doctor to clinic
export const addDoctorToClinic = async (clinicId, doctorData) => {
  const response = await api.post(`/clinics/${clinicId}/doctors`, doctorData);
  return response.data;
};

// Update doctor (missing earlier)
export const updateDoctor = async (doctorId, doctorData) => {
  const response = await api.put(`/doctors/${doctorId}`, doctorData);
  return response.data;
};

// Delete doctor
export const deleteDoctor = async (doctorId) => {
  const response = await api.delete(`/doctors/${doctorId}`);
  return response.data;

 // Missing update doctor in backend
};