import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080", 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token ao cabeçalho Authorization
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Obtém o token do localStorage
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Adiciona o token ao cabeçalho
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
