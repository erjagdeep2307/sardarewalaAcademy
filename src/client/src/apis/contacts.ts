import type { ContactListResponse,ApiResponse, ContactFormData } from '../types/types';
const BASE_URL = 'http://localhost:5935/api/contact';
const fetchContacts = async ():Promise<ContactListResponse> => {
    try {
        const response = await fetch(BASE_URL);
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch contacts');
        }
    } catch (error) {
        console.log('API Error:', error);
        throw error;
    }
};

const createContact = async (data:ContactFormData):Promise<ApiResponse> =>{
    try {
         const response = await fetch(BASE_URL,{
             method:'POST',
             headers:{
             "Content-Type":"application/json"
            },
             body:JSON.stringify(data)
         });
         if(response.ok)
         {
            return response.json();
         }
         else{
            throw new Error(`Failed to Create Contact`)
         }
    } catch (error) {
        console.error(`Api Error:${error}`)
        throw error;
    }
}
export { fetchContacts,createContact};