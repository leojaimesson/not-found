import axios from 'axios';

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
    }

    async getAllWasteByPeriod(period, interval) {
        const response = await this.request.get(`/all-wastes?period=${period}&interval=${interval}`);
        return response;
    }
}