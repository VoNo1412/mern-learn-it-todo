import axios from 'axios';
// export const apiURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000/api' : '';
export const api = axios.create({
    baseURL: 'http://localhost:5000/api'
})
export const LOCAL_STORAGE_TOKEN = 'learn-it';