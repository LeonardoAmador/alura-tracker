import axios, { AxiosInstance } from 'axios';

const clientHttp: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json"
    }
});

export default clientHttp;