import type { ActionApiResponse, ItemApiResponse, ListApiResponse, Events } from "@/types/types";
import { axiosHttpClient as httpclient } from "./axiosClient";
import axios from "axios";
const eventEndpoint = "/events";

// Fetch All Events
const fetchEvents = async (): Promise<ListApiResponse<Events>> => {
    try {
        const apiResponse = await httpclient<ListApiResponse<Events>>(eventEndpoint);
        if (!apiResponse.success) throw new Error(`Failed To Fetch Data`);
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

// Fetch Event By Id
const fetchEventById = async (id: string): Promise<ItemApiResponse<Events>> => {
    try {
        const apiResponse = await httpclient<ItemApiResponse<Events>>(`${eventEndpoint}/${id}`);
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

// Delete Event By Id
const deleteEventById = async (id: string): Promise<ActionApiResponse> => {
    try {
        const apiResponse = await httpclient<ActionApiResponse>(`${eventEndpoint}/${id}`, {
            method: 'DELETE'
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

// Create New Event
const createEvent = async (formData: FormData): Promise<ListApiResponse<Events>> => {
    try {
        const config = {
            method: "POST",
            data: formData
        }
        const apiResponse = await httpclient<ListApiResponse<Events>>(eventEndpoint, config);
        return apiResponse;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // throw exact server payload
            throw error.response?.data ?? { message: error.message, code: error.code };
        }
        throw error;
    }
}
export { createEvent, fetchEvents, fetchEventById, deleteEventById }