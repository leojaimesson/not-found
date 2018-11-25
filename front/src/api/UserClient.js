import axios from 'axios';

export default class UserClient {

    constructor(url) {
        this.url = url;
        this.request = axios.create({
            baseURL: url,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    async save(user) {
        const response = await this.request.post('/', JSON.stringify(user));
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