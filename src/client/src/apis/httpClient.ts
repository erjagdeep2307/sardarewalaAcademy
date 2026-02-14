import { getAccessToken } from "@/contexts/Token";
type validBody = object | string | FormData | boolean | number;

// Define a type for the options to get autocomplete support
type HttpClientOptions = Omit<RequestInit, "body"> & {
  body?: validBody;
};

const BASE_URL = import.meta.env.API_BASE_URL as string;

const httpclient = async <T>(endpoint: string,auth:boolean=false, options: HttpClientOptions = {}): Promise<T> => {
  const { body,...restOptions } = options;

  // Initialize headers
  const headers: Record<string, string> = {
    ...(restOptions.headers as Record<string, string>),
  };

  const httpConfig: RequestInit = {
    ...restOptions,
    headers,
  };
  if (auth) {
    headers["Authorization"] = `Bearer ${getAccessToken()}`;
  }
  // Handle body
  if (body) {
    if (body instanceof FormData) {
      httpConfig.body = body; // browser handles content-type
    } else {
      headers["Content-Type"] = "application/json";
      httpConfig.body = JSON.stringify(body);
    }
  }

  // Fetch the API
  const response = await fetch(`${BASE_URL}${endpoint}`, httpConfig);

  // Handle non-ok status
  if (!response.ok) {
    console.log(response);
    const errorText = response.statusText;
    throw new Error(errorText || `HTTP Error: ${response.status}`);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    // Try to infer type
    return {} as T;
  }

  // Parse JSON
  const data = await response.json();
  return data as T;
};

export default httpclient;
