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

    async getAllWasteByPeriod(period, interval, type) {
        const response = await this.request.get(`/all-wastes?period=${period}&interval=${interval}&idTypeSolidWaste=${type || ''}`);
        return response;
    }

    async getAllWasteByPeriodFull(period, interval, type) {
        const response = await this.request.get(`/all-wastes-full?period=${period}&interval=${interval}&idTypeSolidWaste=${type || ''}`);
        return response;
    }

    async getWastesByPeriod(startDate, endDate, type) {
        const response = await this.request.get(`/roda?startDate=${startDate}&endDate=${endDate}&idTypeSolidWaste=${type || ''}`);
        return response;
    }

    async getWastesByPeriodFull(startDate, endDate, type) {
        const response = await this.request.get(`/roda-full?startDate=${startDate}&endDate=${endDate}&idTypeSolidWaste=${type || ''}`);
        return response;
    }

    async getWasteByPeriod(period, interval, type) {
        const response = await this.request.get(`/wastes?period=${period}&interval=${interval}&idTypeSolidWaste=${type || ''}`);
        return response;
    }
}