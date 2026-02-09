import apiClient from "./apiClient";
import type {
  LoginCredentials,
  AuthResponse,
  User,
  RefreshTokenResponse,
} from "@/domain/types";

export const authService = {
  /**
   * Login user with credentials
   * Calls POST /api/auth/login
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      "/api/auth/login",
      credentials,
    );
    return response.data;
  },

  /**
   * Get current user info
   * Calls GET /api/auth/me
   */
  async getMe(): Promise<User> {
    const response = await apiClient.get<User>("/api/auth/me");
    return response.data;
  },

  /**
   * Refresh access token
   * Calls POST /api/auth/refresh
   */
  async refreshToken(): Promise<RefreshTokenResponse> {
    const response =
      await apiClient.post<RefreshTokenResponse>("/api/auth/refresh");
    return response.data;
  },

  /**
   * Logout user
   * Calls POST /api/auth/logout
   */
  async logout(): Promise<void> {
    await apiClient.post("/api/auth/logout");
  },
};
