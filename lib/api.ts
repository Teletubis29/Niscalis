/**
 * API Wrapper Utility
 * Centralized fetch wrapper with error handling, type safety, and auth token management
 */

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Centralized API fetch wrapper
 * Handles common error cases, timeout, and auth token injection
 */
async function apiCall<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = 10000,
    headers = {},
    ...fetchOptions
  } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // Prepare headers with defaults
    const headersToUse = new Headers({
      "Content-Type": "application/json",
    });

    // Merge additional headers
    if (headers) {
      if (typeof headers === "object" && !(headers instanceof Headers)) {
        Object.entries(headers).forEach(([key, value]) => {
          if (typeof value === "string") {
            headersToUse.set(key, value);
          }
        });
      }
    }

    // Inject auth token if available (from session/localStorage)
    // This is a placeholder - adjust based on your auth implementation
    try {
      const session = await fetch("/api/auth/session").then(r => r.json()).catch(() => null);
      if (session?.user?.token) {
        headersToUse.set("Authorization", `Bearer ${session.user.token}`);
      }
    } catch {
      // Continue without token if session fetch fails
    }

    const response = await fetch(endpoint, {
      ...fetchOptions,
      headers: headersToUse,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Parse response
    let data;
    const contentType = response.headers.get("content-type");
    
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    // Success response
    if (response.ok) {
      return {
        data: data as T,
        status: response.status,
      };
    }

    // Error response
    return {
      error: data?.error || data?.message || "An error occurred",
      message: data?.message || data?.error,
      status: response.status,
    };
  } catch (error) {
    clearTimeout(timeoutId);

    // Handle specific error types
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      return {
        error: "Network error - please check your connection",
        status: 0,
      };
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        error: "Request timeout - please try again",
        status: 408,
      };
    }

    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    return {
      error: errorMessage,
      status: 500,
    };
  }
}

/**
 * GET request wrapper
 */
export async function apiGet<T = any>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    ...options,
    method: "GET",
    cache: options?.cache || "no-store",
  });
}

/**
 * POST request wrapper
 */
export async function apiPost<T = any>(
  endpoint: string,
  body?: any,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    ...options,
    method: "POST",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PUT request wrapper
 */
export async function apiPut<T = any>(
  endpoint: string,
  body?: any,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    ...options,
    method: "PUT",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * PATCH request wrapper
 */
export async function apiPatch<T = any>(
  endpoint: string,
  body?: any,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    ...options,
    method: "PATCH",
    body: body ? JSON.stringify(body) : undefined,
  });
}

/**
 * DELETE request wrapper
 */
export async function apiDelete<T = any>(
  endpoint: string,
  options?: FetchOptions
): Promise<ApiResponse<T>> {
  return apiCall<T>(endpoint, {
    ...options,
    method: "DELETE",
  });
}

/**
 * Helper to check if response is an error
 */
export function isApiError(response: ApiResponse): boolean {
  return !response.data && !!response.error;
}

/**
 * Helper to throw error if response has error
 */
export function throwIfError<T>(response: ApiResponse<T>): T {
  if (isApiError(response)) {
    throw new Error(response.error || "An error occurred");
  }
  return response.data as T;
}
