// src/services/authService.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const register = async (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};
