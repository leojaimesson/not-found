import axios from 'axios';

export default class TypeSolidWasteClient {

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


    async save(typeSolidWaste) {
        const response = await this.request.post('/', JSON.stringify(typeSolidWaste));
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