import apiClient from "./apiClient";
import type {
  Product,
  ProductsResponse,
  CategoryResponse,
} from "@/domain/types";

interface FetchProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  category?: string;
}

export const productsService = {
  /**
   * Fetch all products with pagination and sorting
   * Calls GET /api/products
   */
  async fetchProducts(
    params: FetchProductsParams = {},
  ): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>("/api/products", {
      params,
    });
    return response.data;
  },

  /**
   * Get product by ID
   * Calls GET /api/products/:id
   */
  async getProductById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/api/products/${id}`);
    return response.data;
  },

  /**
   * Fetch products by category
   * Calls GET /api/products/category/:category
   */
  async getProductsByCategory(
    category: string,
    params: FetchProductsParams = {},
  ): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(
      `/api/products/category/${category}`,
      { params },
    );
    return response.data;
  },

  /**
   * Fetch all categories
   * Calls GET /api/products/categories
   */
  async getCategories(): Promise<CategoryResponse[]> {
    const response = await apiClient.get<CategoryResponse[]>(
      "/api/products/categories",
    );
    return response.data;
  },

  /**
   * Search products
   * Calls GET /api/products/search
   */
  async searchProducts(
    query: string,
    params: FetchProductsParams = {},
  ): Promise<ProductsResponse> {
    const response = await apiClient.get<ProductsResponse>(
      "/api/products/search",
      {
        params: { q: query, ...params },
      },
    );
    return response.data;
  },
};
