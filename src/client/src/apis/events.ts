import type { ActionApiResponse, ItemApiResponse, ListApiResponse, Events } from "@/types/types";
import httpclient from "./httpClient";

const eventEndpoint = "/events"; 

// Fetch All Events
export const fetchEvents = async (): Promise<ListApiResponse<Events>> => {
    try {
        const apiResponse = await httpclient<ListApiResponse<Events>>(eventEndpoint);
        if (!apiResponse.success) throw new Error(`Failed To Fetch Data`);
        return apiResponse;
    }
    catch (error) {
        console.log('Api Error:', error);
        return {
            success: false,
            message: "Generic Error",
            data: []
        }
    }
}

// Fetch Event By Id
export const fetchEventById = async (id: string): Promise<ItemApiResponse<Events>> => {
    try {
        const apiResponse = await httpclient<ItemApiResponse<Events>>(`${eventEndpoint}/${id}`);
        return apiResponse;
    }
    catch (error) {
        console.log(`Error:`, error)
        return {
            success: false,
            message: "Generic Error",
            data: []
        }
    }
}

// Delete Event By Id
export const deleteEventById = async (id: string): Promise<ActionApiResponse> => {
    try {
        const config = {
            method: "DELETE"
        }
        const apiResponse = await httpclient<ActionApiResponse>(`${eventEndpoint}/${id}`, config);
        return apiResponse;
    } catch (error) {
        console.log(`Error:`, error)
        return {
            success: false,
            message: "Generic Error",
        }
    }
}

// Create New Event
export const createEvent = async (formData: FormData): Promise<ListApiResponse<Events>> => {
    try {
        const config = {
            method: "POST",
            body: formData
        }
        const apiResponse = await httpclient<ListApiResponse<Events>>(eventEndpoint, config);
        return apiResponse;
    } catch (error) {
        console.log(`Error:`, error)
        return {
            success: false,
            message: "Generic Error",
            data: []
        }
    }
}