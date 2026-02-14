import { NextResponse } from "next/server";
import type { Product } from "@/domain/types";

const DUMMYJSON_URL = process.env.DUMMYJSON_URL || "https://dummyjson.com";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const response = await fetch(`${DUMMYJSON_URL}/products/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { message: "Product not found" },
          { status: 404 },
        );
      }
      return NextResponse.json(
        { message: "Failed to fetch product" },
        { status: response.status },
      );
    }

    const data: Product = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Fetch product error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
