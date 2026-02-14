import { NextResponse } from "next/server";
import { getRefreshToken, setTokens } from "@/lib/auth";
import type { RefreshTokenResponse } from "@/domain/types";

const DUMMYJSON_URL = process.env.DUMMYJSON_URL || "https://dummyjson.com";

export async function POST() {
  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token not found" },
        { status: 401 },
      );
    }

    // Call DummyJSON /auth/refresh API
    const response = await fetch(`${DUMMYJSON_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to refresh token" },
        { status: 401 },
      );
    }

    const data: RefreshTokenResponse = await response.json();

    // Update tokens in HTTP-only cookies
    await setTokens(data.accessToken, data.refreshToken);

    return NextResponse.json({
      message: "Token refreshed successfully",
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
