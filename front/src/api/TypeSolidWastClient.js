import axios from 'axios';

export default class TypeSolidWastClient {

    constructor(url) {
        this.url = url;
        this.request = axios.create({
            baseURL: url,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


    async save(typeSolidWast) {
        const response = await this.request.post('/', JSON.stringify(typeSolidWast));
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