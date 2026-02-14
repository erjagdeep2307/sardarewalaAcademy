import type { AuthApiResponse, ILoginData, LoginData } from "@/types/auth.types";
import httpclient from "./httpClient";
const login = async (loginPayload:LoginData):Promise<AuthApiResponse<ILoginData>> =>{
    try{
        const apiResponse = await httpclient<AuthApiResponse<ILoginData>>("/auth/login",{
            method:"POST",
            credentials:"include",
            body: loginPayload
        });
        return apiResponse;
    }
    catch(error){
        console.error(error);
        return {
            status: 'fail',
            message: "Something Went Wrong",
            data: null
        }
    }
}
const logout = async (token:string|null):Promise<AuthApiResponse<null>> => {
    try{
        console.log(`token in logout api: ${token}`);
        const apiResponse = await httpclient<AuthApiResponse<null>>("/auth/logout",{
            method:"POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            credentials:"include"
        });
        return apiResponse;
    }
    catch(error){
        console.error(error);
        return {
            status: 'fail',
            message: "Something Went Wrong",
            data: null
        }
    }   
}

const refresh = async ():Promise<AuthApiResponse<ILoginData>> =>{
    try {
         const apiResponse = await httpclient<AuthApiResponse<ILoginData>>("/auth/refresh",{
            method:"POST",
            credentials:"include"
        });
        return apiResponse;
    } catch (error) {
        console.error(error);
        return {
            status: 'fail',
            message: "Something Went Wrong",
            data: null
        }      
    }
}

export {login,logout,refresh};