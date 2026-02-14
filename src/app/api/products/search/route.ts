import { NextRequest, NextResponse } from "next/server";
import type { ProductsResponse } from "@/domain/types";

const DUMMYJSON_URL = process.env.DUMMYJSON_URL || "https://dummyjson.com";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Get query parameters
    const q = searchParams.get("q");
    const limit = searchParams.get("limit") || "10";
    const skip = searchParams.get("skip") || "0";
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");

    if (!q) {
      return NextResponse.json(
        { message: "Search query is required" },
        { status: 400 },
      );
    }

    // Build the URL
    let url = `${DUMMYJSON_URL}/products/search?q=${encodeURIComponent(q)}&limit=${limit}&skip=${skip}`;

    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to search products" },
        { status: response.status },
      );
    }

    const data: ProductsResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search products error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
