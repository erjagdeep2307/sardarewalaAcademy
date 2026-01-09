import type { EventByIdResponse, EventListResponse } from "@/types/types";
const BASE_URL = "https://utilization-bond-train-receipt.trycloudflare.com/events";

// Will Return Response in EventListResponse Format
export const fetchEvents = async ():Promise<EventListResponse> =>{
    try {
        const response = await fetch(BASE_URL);
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw new Error('Failed to Fetch Events Data');
        }
    } 
    catch (error) {
        console.log('Api Error:',error);
        throw error;
    }
}
// Fetch Event By Id
export const fetchEventById = async (id:string):Promise<EventByIdResponse> =>{
    try {
        const response =  await fetch(`${BASE_URL}/${id}`)
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw new Error(`Failed to Fetch Event by id ${id}`)
        }
    } 
    catch (error) {
        console.log(`Error:`,error)
        throw error;   
    }
}
// Delete Event By Id
export const deleteEventById = async (id:string):Promise<EventByIdResponse> =>{
    try {
        const response =  await fetch(`${BASE_URL}/${id}`,{
            method:'DELETE'
        });
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw new Error(`Failed to Delete Event by id ${id}`)
        }
    } catch (error) {
        console.log(`Error:`,error)
        throw error;
    }
}