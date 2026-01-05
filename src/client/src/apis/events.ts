const BASE_URL = "http://localhost:3000/events";
export const fetchEvents = async () =>{
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