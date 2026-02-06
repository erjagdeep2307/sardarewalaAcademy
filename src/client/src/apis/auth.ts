import type { AuthApiResponse, ILoginData, LoginData } from "@/types/auth.types";
import httpclient from "./httpClient";
const login = async (loginPayload:LoginData):Promise<AuthApiResponse<ILoginData>> =>{
    try{
        const apiResponse = await httpclient<AuthApiResponse<ILoginData>>("/auth/login",{
            method:"POST",
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

export {login}