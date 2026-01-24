type validBody = object | string | FormData | null | boolean |number;
// Define a type for the options to get autocomplete support
type HttpClientOptions = Omit<RequestInit,'body'> & {
  body?: validBody; // Can be object, array, or FormData
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const httpclient = async <T>(endpoint: string, options: HttpClientOptions = {}): Promise<T | null> => {
  const { body, ...restOptions } = options;

  // Initialize headers properly
  const headers: Record<string, string> = {
    ...(restOptions.headers as Record<string, string>),
  };

  const httpConfig: RequestInit = {
    ...restOptions,
    headers,
  };

  if (body) {
    if (body instanceof FormData) {
      // Browser handles Content-Type for FormData
      httpConfig.body = body;
    } else {
      // Default to JSON for everything else
      headers['Content-Type'] = 'application/json';
      httpConfig.body = JSON.stringify(body);
    }
  }

  // Note: I fixed the template literal to use the 'endpoint' variable
  const apiResponse = await fetch(`${BASE_URL}${endpoint}`, httpConfig);

  if (!apiResponse.ok) {
    // You can optionally try to parse the error body from the server here
    throw new Error(`HTTP Error: ${apiResponse.status}`);
  }

  if (apiResponse.status === 204) return null;

  return apiResponse.json() as Promise<T>;
};
export default httpclient;