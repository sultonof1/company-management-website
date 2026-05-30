import axios from 'axios';

const API = axios.create({
  baseURL: 'https://sultonof-backend.onrender.com/api'
});

// Admin kirgan bo'lsa, xavfsizlik tokennini so'rovlarga avtomatik qo'shish
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => API.post('/auth/login', { email, password }),
  register: (email, password) => API.post('/auth/register', { email, password })
};

export const employeeAPI = {
  getAll: () => API.get('/employees'),
  create: (data) => API.post('/employees', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => API.put(`/employees/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => API.delete(`/employees/${id}`)
};

export const aboutAPI = {
  get: () => API.get('/about'),
  update: (data) => API.put('/about', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteImage: (imagePath) => API.delete('/about/image', { data: { imagePath } })
};

export const projectAPI = {
  getAll: () => API.get('/projects'),
  create: (data) => API.post('/projects', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id, data) => API.put(`/projects/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id) => API.delete(`/projects/${id}`)
};

export default API;
