// src/api/userApi.js
import api from "./axios";

// Auth: Login
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Auth: Signup
export const signup = async (userData) => {
  const response = await api.post("/auth/signup", userData);
  return response.data;
};

// Get user by ID
export const fetchUser = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Update user (patch phone/password)
export const updateUser = async (userId, updateData) => {
  const response = await api.patch(`/users/${userId}`, updateData);
  return response.data;
};

// Delete user
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

// Get all users (for AdminPanel)
export const fetchAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};