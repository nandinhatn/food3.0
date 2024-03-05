import axios from 'axios';
const apiWhats = axios.create({
    baseURL: "http://www.poppytecnologias.com.br:8082",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})
export default apiWhats;