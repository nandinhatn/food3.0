import axios from 'axios';
const api = axios.create({
    // baseURL: "https://www.poppytecnologias.com.br:21221"
    baseURL: "http://localhost:8000"
})
export default api;