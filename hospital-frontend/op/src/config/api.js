// Centralized API Configuration
export const API_BASE_URL = "http://127.0.0.1:8000/api";

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login/`,
  REGISTER: `${API_BASE_URL}/register/`,
  APPOINTMENTS: `${API_BASE_URL}/appointments/`,
  SAVE_APPOINTMENT: `${API_BASE_URL}/save/`,
  DELETE_APPOINTMENT: (id) => `${API_BASE_URL}/delete/${id}/`,
};
