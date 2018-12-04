import axios from 'axios';
import { getToken } from "../services/auth";

export default class SolidWasteCollectedClient {

    constructor(url) {
        this.url = url;
        this.request = axios.create({
            baseURL: url,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.request.interceptors.request.use(async config => {
            const token = getToken();
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }


    async save(solidWasteCollected) {
        const response = await this.request.post('/', JSON.stringify(solidWasteCollected));
        return response;
    }

    async getAll() {
        const response = await this.request.get('/');
        return response;
    }

    async remove(id) {
        const response = await this.request.delete(`?id=${id}`);
        return response;
    }
}