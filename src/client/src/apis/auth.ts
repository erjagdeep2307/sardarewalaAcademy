import type { AuthApiResponse, ILoginData, LoginData } from "@/types/auth.types";
import { axiosHttpClient as httpclient } from "./axiosClient";
import axios from "axios";
const login = async (loginPayload: LoginData): Promise<AuthApiResponse<ILoginData>> => {
    try {
        const apiResponse = await httpclient<AuthApiResponse<ILoginData>>("/auth/login", {
            method: "POST",
            data: loginPayload
        });
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
const logout = async (): Promise<AuthApiResponse<null>> => {
    try {
        const apiResponse = await httpclient<AuthApiResponse<null>>("/auth/logout", {
            method: "POST",
        });
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

const refresh = async (signal: AbortSignal): Promise<AuthApiResponse<ILoginData>> => {
    try {
        const apiResponse = await httpclient<AuthApiResponse<ILoginData>>("/auth/refresh", {
            method: "POST",
            signal: signal
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

export { login, logout, refresh };