import axios from "axios";
import { axiosHttpClient as httpClient } from "./axiosClient";
import type { ActionApiResponse, ItemApiResponse, ListApiResponse, Program} from "@/types/types";
const programEndpoint = "program";
const addProgram = async (formData: FormData): Promise<ItemApiResponse<Program>> => {
    try {
        const apiResponse = await httpClient<ItemApiResponse<Program>>(programEndpoint, {
            method: "POST",
            data: formData,
            timeout: 10000
        });
        return apiResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(`Axios Error`,error);
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}
const listProgram = async (): Promise<ListApiResponse<Program>> => {
    try {
        const apiResponse = await httpClient<ListApiResponse<Program>>(programEndpoint);
        return apiResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}

const removeProgram = async (id:string): Promise<ActionApiResponse> => {
    try {
        const apiResponse =  await httpClient<ActionApiResponse>(`${programEndpoint}/${id}`,{
            method:"DELETE"
        });
        return apiResponse;        
    } catch (error) {
         if (axios.isAxiosError(error)) {
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}
export { addProgram, listProgram, removeProgram }