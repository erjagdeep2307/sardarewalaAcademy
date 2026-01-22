import type { TestomonialList, ApiResponse,CreateApiResponse } from "@/types/types";
// const BASE_URL="https://contributor-craig-podcasts-lake.trycloudflare.com/testomonials";
const BASE_URL = "http://localhost:5935/api/testomonials";

export const createTestomonial = async (formData:FormData): Promise<CreateApiResponse> => {
    try {
        const apiResponse = await fetch(BASE_URL,{
            method:"POST",
            body: formData
        });
        if (!apiResponse.ok) {
            throw new Error("Failed to Create Testomonial");
        }
        return apiResponse.json();

    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to Create Testomonial",
            data: {}
        }
    }
}
export const fetcthTestomonials = async (): Promise<TestomonialList> => {
    try {
        const apiResponse = await fetch(BASE_URL);
        if (!apiResponse.ok) {
            throw new Error(`Faiiled to Fetch Testomonial Data`);
        }
        return apiResponse.json();
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: "Failed to fetch testimonials",
            data: []
        };
    }
}
export const removeTestomonialById = async (id: number): Promise<ApiResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE"
        });
        return response.json();
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to Delete the Testomonial`);
    }
}