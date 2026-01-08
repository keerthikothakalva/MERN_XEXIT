import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
});

export const submitResignation = (data) => api.post('/api/resignation', data);
export const submitExitInterview = (data) => api.post('/api/exit-interview', data);

export default api;
