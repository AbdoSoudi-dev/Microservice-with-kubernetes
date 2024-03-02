import store from "./stores/auth";
import axios from "axios";

const BACKEND_URL =  ''/*import.meta.env.VITE_API_URL*/;

const api = axios.create({
    baseURL: `${BACKEND_URL}/api`,
})
api.interceptors.request.use(config=>{
    const token = store.state.token;
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

export default api;
