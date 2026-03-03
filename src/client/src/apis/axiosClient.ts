import axios,{AxiosError,} from "axios";
import type { AxiosInstance,AxiosRequestConfig,InternalAxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken } from "@/contexts/Token";
// Base Url 
const BASE_URL =
  // "https://serial-arthritis-hurricane-adrian.trycloudflare.com/api";
"https://troubleshooting-passing-actress-authors.trycloudflare.com/api";
// Create Axios Client Instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 4000,
  withCredentials: true, // required for refresh cookie
});

/* ======================================================
   REFRESH STATE MANAGEMENT
====================================================== */

let isRefreshing = false;
let refreshQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

/**
 * Process queued requests after refresh completes
 */
const processQueue = (error: unknown, token: string | null = null) => {
  refreshQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  refreshQueue = [];
};

const skipRefreshEndpoints = [
  "/auth/login",
  "/auth/logout",
  "/auth/refresh"
];

/* ======================================================
   REQUEST INTERCEPTOR (Inject Access Token)
====================================================== */

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ======================================================
   RESPONSE INTERCEPTOR (Refresh Logic)
====================================================== */

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    const isAuthRoute = skipRefreshEndpoints.some((url) => originalRequest.url?.includes(url));

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRoute
    ) {
      // console.debug(`Recieved 401 and access Token is expired`);
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        // console.debug(`Refresh token response:`, refreshResponse);
        const newAccessToken = refreshResponse.data?.data?.token;

        if (!newAccessToken) {
          throw new Error("No access token returned from refresh");
        }

        // Update token in memory/context
        setAccessToken(newAccessToken);
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        // console.log(`Api Original Request`,originalRequest)
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // Optional: clear token and redirect to login
        setAccessToken(null);

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* ======================================================
   GENERIC HTTP CLIENT FUNCTION
====================================================== */

export const axiosHttpClient = async <T>(
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.request<T>({
    url: endpoint,
    ...options,
  });
  return response.data;
};
