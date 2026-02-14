import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/auth";
import type { User } from "@/domain/types";

const DUMMYJSON_URL = process.env.DUMMYJSON_URL || "https://dummyjson.com";

export async function GET() {
  try {
    const token = await getAccessToken();

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Call DummyJSON /auth/me API with the token
    const response = await fetch(`${DUMMYJSON_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { message: "Token expired or invalid" },
          { status: 401 },
        );
      }
      return NextResponse.json(
        { message: "Failed to fetch user" },
        { status: response.status },
      );
    }

    const data: User = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Get user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
