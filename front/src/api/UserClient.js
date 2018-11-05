import axios from 'axios';

export default class UserClient {

    constructor() {
        this.request = axios.create({
            baseURL: 'http://localhost:3001/users',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    async save(user) {
        const response = await this.request.post('/', JSON.stringify(user));
        console.log(response);
    }
}