import { useState, useCallback } from "react";

interface FetchOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
  credentials?:RequestCredentials; // 🔑 Esto permite que el navegador guarde cookies del servidor
}

interface FetchResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

interface UseFetchReturn {
  get: <T>(options?: FetchOptions) => Promise<FetchResponse<T>>;
  post: <T>(data: any, options?: FetchOptions) => Promise<FetchResponse<T>>;
  put: <T>(data: any, options?: FetchOptions) => Promise<FetchResponse<T>>;
  delete: <T>(options?: FetchOptions) => Promise<FetchResponse<T>>;
}

const useFetch = (baseUrl: string): UseFetchReturn => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeRequest = useCallback(
    async <T>(
      method: "GET" | "POST" | "PUT" | "DELETE",
      data?: any,
      options: FetchOptions = {}
    ): Promise<FetchResponse<T>> => {
      setIsLoading(true);
      try {

        const config: RequestInit = {
          method,
          signal: options.signal,
          headers: {
            ...options.headers,
          },
          credentials: options.credentials
        };

        if (data && !(data instanceof FormData)) {
          config.headers = {
            "Content-Type": "application/json",
            ...config.headers,
          };
          
          config.body = JSON.stringify(data)
        } else if (data instanceof FormData) {
          
          
          config.headers = {
            "Content-Type": "application/json",
            ...config.headers,
          };
          config.body = JSON.stringify(Object.fromEntries(data));
        }
        
        const response = await fetch(baseUrl, config);

        if (!response.ok) {
          
          
          const errorText = await response.text();
          if(errorText.includes("ValidationError") && errorText.toLocaleLowerCase().includes("credenciales")){
            throw new Error(
            `Credenciales Incorrectas`
          );
          }
          
          throw new Error(
            `HTTTP ${response.status}: ${errorText || response.statusText}`
          );
        }
        const contentType = response.headers.get("content-type");
        let responseData: T;

        if (contentType?.includes("application/json")) {
          responseData = await response.json();
        } else {
          responseData = (await response.text()) as unknown as T;
        }
        setIsLoading(false);
        return {
          data: responseData,
          error: null,
          isLoading,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Error desconocido";
        setIsLoading(false);
        
        return {
          data: null,
          error: errorMessage,
          isLoading,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl]
  );

  const get = useCallback(
    <T>(options?: FetchOptions) => makeRequest<T>("GET", undefined, options),
    [makeRequest]
  );

  const post = useCallback(
    <T>(data: any, options?: FetchOptions) =>
      makeRequest<T>("POST", data, options),
    [makeRequest]
  );

  const put = useCallback(
    <T>(data: any, options?: FetchOptions) =>
      makeRequest<T>("PUT", data, options),
    [makeRequest]
  );

  const deleteMethod = useCallback(
    <T>(options?: FetchOptions) => makeRequest<T>("DELETE", undefined, options),
    [makeRequest]
  );

  return {
    get,
    post,
    put,
    delete: deleteMethod,
  };
};

export default useFetch;
