import type { Contact, ContactFormData, ListApiResponse, ItemApiResponse, ActionApiResponse } from '../types/types';
import httpclient from './httpClient';

const contactEndpoint = "/contact";
const fetchContacts = async (): Promise<ListApiResponse<Contact>> => {
    try {
        const apiResponse = await httpclient<ListApiResponse<Contact>>(contactEndpoint); 
        return apiResponse;
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            message: "Generic Error",
            data: []
        }
    }
};

const createContact = async (data: ContactFormData): Promise<ItemApiResponse<Contact>> => {
    try {
        const apiResponse = await httpclient<ItemApiResponse<Contact>>(contactEndpoint, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: data   // No need to stringify httpClient have already implemented this
        });
        return apiResponse;
    } catch (error) {
        console.error(`Api Error:${error}`)
        return {
            success: false,
            message: "Generic Error",
            data: null
        }
    }
}
interface ContactUpdatePayload {
    id: number,
    status: string
}

const updateContact = async (payload: ContactUpdatePayload): Promise<ActionApiResponse> => {
    try {
        const { id, status } = payload;
        const apiResponse = await httpclient<ActionApiResponse>(`${contactEndpoint}/${id}`, {
            method: "PATCH",
            body: {
                status: status
            }
        });
        return apiResponse;
    }
    catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Generic Error",
        }
    }
}
export { fetchContacts, createContact, updateContact };