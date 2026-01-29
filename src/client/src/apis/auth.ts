import type { AuthApiResponse, ILoginData, LoginData } from "@/types/auth.types";
import httpclient from "./httpClient";
const login = async (loginPayload:LoginData):Promise<AuthApiResponse<ILoginData>> =>{
    try{
        const apiResponse = await httpclient<AuthApiResponse<ILoginData>>("/auth/login",{
            method:"POST",
            body: loginPayload
        });
        if(apiResponse.status !== "success") throw new Error("Failed to Login");
        return apiResponse;
    }
    catch(error){
        console.error(error);
        return {
            status: 'fail',
            message: "Generic Error",
            data: null
        }
    }
}

export {login}