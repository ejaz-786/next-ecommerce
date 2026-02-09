import { NextRequest, NextResponse } from "next/server";
import type { ProductsResponse } from "@/domain/types";

const DUMMYJSON_URL = "https://dummyjson.com";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Get query parameters
    const limit = searchParams.get("limit") || "10";
    const skip = searchParams.get("skip") || "0";
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");
    const category = searchParams.get("category");

    // Build the URL
    let url = `${DUMMYJSON_URL}/products?limit=${limit}&skip=${skip}`;

    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }

    if (category) {
      url = `${DUMMYJSON_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
      if (sortBy && order) {
        url += `&sortBy=${sortBy}&order=${order}`;
      }
    }
    console.log("check1:", url);
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch products" },
        { status: response.status },
      );
    }

    const data: ProductsResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch products error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
