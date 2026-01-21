import type { TestomonialList,ApiResponse } from "@/types/types";
// const BASE_URL="https://contributor-craig-podcasts-lake.trycloudflare.com/testomonials";
const BASE_URL = "http://localhost:5935/api/testomonials";

export const fetcthTestomonials = async ():Promise<TestomonialList> =>{
    try {
        const apiResponse =  await fetch(BASE_URL);
        if(!apiResponse.ok)
        {
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
export const removeTestomonialById = async (id:number):Promise<ApiResponse>=>{
    try {
        const response =  await fetch(`${BASE_URL}/${id}`,{
            method:"DELETE"
        });
            return response.json();
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to Delete the Testomonial`);
    }
}