import axios from 'axios';
const api = axios.create({
    baseURL: "https://www.poppytecnologias.com.br:21221"
})
export default api;