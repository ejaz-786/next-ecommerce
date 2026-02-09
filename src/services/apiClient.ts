import axios, { AxiosInstance } from "axios";

// Create an axios instance for making requests
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true, // Send cookies with requests
});

// List of endpoints that should NOT trigger auto-refresh
const NO_REFRESH_ENDPOINTS = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/refresh",
];

// Interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest.url || "";

    // Check if this is an endpoint that should NOT trigger refresh
    const shouldNotRefresh = NO_REFRESH_ENDPOINTS.some((endpoint) =>
      requestUrl.includes(endpoint),
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldNotRefresh
    ) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        await apiClient.post("/api/auth/refresh");
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Redirect to login on refresh failure
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
