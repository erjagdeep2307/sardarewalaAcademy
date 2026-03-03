import type { Contact, ContactFormData, ListApiResponse, ItemApiResponse, ActionApiResponse } from '../types/types';
import { axiosHttpClient as httpclient } from './axiosClient'; 
import axios from 'axios';
const contactEndpoint = "/contact";
const fetchContacts = async (): Promise<ListApiResponse<Contact>> => {
    try {
        const apiResponse = await httpclient<ListApiResponse<Contact>>(contactEndpoint); 
        return apiResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // throw exact server payload
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
};

const createContact = async (data: ContactFormData): Promise<ItemApiResponse<Contact>> => {
    try {
        const apiResponse = await httpclient<ItemApiResponse<Contact>>(contactEndpoint,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            data: data   // No need to stringify httpClient have already implemented this
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
interface ContactUpdatePayload {
    id: number,
    status: string
}

const updateContact = async (payload: ContactUpdatePayload): Promise<ActionApiResponse> => {
    try {
        const { id, status } = payload;
        const apiResponse = await httpclient<ActionApiResponse>(`${contactEndpoint}/${id}`,{
            method: "PATCH",
            data: {
                status: status
            }
        });
        return apiResponse;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            // throw exact server payload
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}
export { fetchContacts, createContact, updateContact };