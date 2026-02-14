import type { ActionApiResponse, ItemApiResponse, ListApiResponse, Testomonial } from "@/types/types";
import httpclient from "./httpClient";

const testomonyEndpoint="/testomonials";

export const createTestomonial = async (formData: FormData): Promise<ItemApiResponse<Testomonial>> => {
    try {
        const apiResponse = await httpclient<ItemApiResponse<Testomonial>>(testomonyEndpoint
            , {
                method: "POST",
                body: formData
            });
        return apiResponse;

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to Create Testomonial",
            data: null
        }
    }
}

export const fetchTestomonials = async (): Promise<ListApiResponse<Testomonial>> => {
    try {
        const apiResponse = await httpclient<ListApiResponse<Testomonial>>(testomonyEndpoint);
        return apiResponse;
    } catch (error) {
        console.error(error)
        return {
            success: false,
            message: "Generic Error",
            data: []
        };
    }
}

export const removeTestomonialById = async (id: number): Promise<ActionApiResponse> => {
    try {
        const apiResponse = await httpclient<ActionApiResponse>(`${testomonyEndpoint}/${id}`, { method: "DELETE" })
        return apiResponse;
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Generic Error",
        };
    }
}