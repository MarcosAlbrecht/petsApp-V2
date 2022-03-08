import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.6:8085/'
});

export default api;