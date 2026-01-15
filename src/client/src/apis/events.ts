import type { EventByIdResponse, EventListResponse } from "@/types/types";
// const BASE_URL = "https://contributor-craig-podcasts-lake.trycloudflare.com/events";
const BASE_URL = "http://localhost:5935/api/events";

// Will Return Response in EventListResponse Format
export const fetchEvents = async ():Promise<EventListResponse> =>{
    try {
        const response = await fetch(BASE_URL);
        console.log(response);
        if(response.ok)
        {
            return response.json();
        }
        throw new Error('No Data Found')
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
// Create New Event
export const createEvent = async (formData:FormData):Promise<EventByIdResponse> =>{
    try {
        const response =  await fetch(`${BASE_URL}`,{
            method:'POST',
            body:formData
        }); 
        if(response.ok)
        {
            return response.json();
        }
        else{
            throw new Error(`Failed to Create New Event`)
        }
    } catch (error) {
        console.log(`Error:`,error)
        throw error;
    }
}