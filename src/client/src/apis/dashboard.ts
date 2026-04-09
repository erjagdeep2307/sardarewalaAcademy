import type { DashboardData, ItemApiResponse } from '../types/types';
import { axiosHttpClient as httpclient } from "./axiosClient";
import axios from 'axios';
const analyticsEndpoint = "/dashboard";
const fetchAnalytics = async () => {
    try {
        const apiResponse = await httpclient<ItemApiResponse<DashboardData>>(analyticsEndpoint);
        return apiResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // throw exact server payload
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}
export { fetchAnalytics };
