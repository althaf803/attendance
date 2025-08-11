// In frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Interceptor to add the token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const getSummary = () => api.get('/attendance/summary');
export const addOrUpdateRecord = (data) => api.post('/attendance', data);
export const updateUserTarget = (targetData) => api.put('/users/profile', targetData);
export default api;