// src/api/appointmentApi.js
import api from "./axios";

// Book appointment
export const bookAppointment = async (appointmentData) => {
  const response = await api.post("/appointments", appointmentData);
  return response.data;
};

// Get appointments for a user
export const fetchAppointmentsByUser = async (userId) => {
  const response = await api.get(`/appointments/user/${userId}`);
  return response.data;
};

// Get appointments for a clinic
export const fetchAppointmentsByClinic = async (clinicId) => {
  const response = await api.get(`/appointments/clinic/${clinicId}`);
  return response.data;
};

// Update appointment
export const updateAppointment = async (appointmentId, appointmentData) => {
  const response = await api.put(`/appointments/${appointmentId}`, appointmentData);
  return response.data;
};

// Delete appointment
export const deleteAppointment = async (appointmentId) => {
  const response = await api.delete(`/appointments/${appointmentId}`);
  return response.data;
};
