import { NextRequest, NextResponse } from "next/server";
import type { CategoryResponse } from "@/domain/types";

const DUMMYJSON_URL = "https://dummyjson.com";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${DUMMYJSON_URL}/products/categories`);

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch categories" },
        { status: response.status },
      );
    }

    const data: CategoryResponse[] = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch categories error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
