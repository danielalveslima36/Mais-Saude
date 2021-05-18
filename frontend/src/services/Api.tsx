import axios from 'axios';

const API = axios.create({
    baseURL:'http://192.168.0.103:3333'
})

export default API