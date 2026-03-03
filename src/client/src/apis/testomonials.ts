import type { ActionApiResponse, ItemApiResponse, ListApiResponse, Testomonial } from "@/types/types";
// import httpclient from "./httpClient";
import { axiosHttpClient as httpclient } from "./axiosClient";
import axios from "axios";

const testomonyEndpoint = "/testomonials";

const createTestomonial = async (formData: FormData): Promise<ItemApiResponse<Testomonial>> => {
    try {
        const apiResponse = await httpclient<ItemApiResponse<Testomonial>>(testomonyEndpoint, {
            method: "POST",
            data: formData,
            timeout: 10000, // 10 seconds timeout for file upload
        });
        return apiResponse;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            // throw exact server payload
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}

const fetchTestomonials = async (): Promise<ListApiResponse<Testomonial>> => {
    try {
        const apiResponse = await httpclient<ListApiResponse<Testomonial>>(testomonyEndpoint);
        return apiResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // throw exact server payload
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}

const removeTestomonialById = async (id: number): Promise<ActionApiResponse> => {
    try {
        const apiResponse = await httpclient<ActionApiResponse>(`${testomonyEndpoint}/${id}`,
            {
                method: "DELETE",
            })
        return apiResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // throw exact server payload
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}
export { createTestomonial, fetchTestomonials, removeTestomonialById };