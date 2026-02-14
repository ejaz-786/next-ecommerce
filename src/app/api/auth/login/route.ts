import { NextRequest, NextResponse } from "next/server";
import { setTokens } from "@/lib/auth";
import type { LoginCredentials, AuthResponse } from "@/domain/types";
import { log } from "console";

// const DUMMYJSON_URL = "https://dummyjson.com";
const DUMMYJSON_URL = process.env.DUMMYJSON_URL || "https://dummyjson.com";

export async function POST(request: NextRequest) {
  try {
    const body: LoginCredentials = await request.json();

    // Validate input
    if (!body.username || !body.password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 },
      );
    }

    // Call DummyJSON login API
    const response = await fetch(`${DUMMYJSON_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const data: AuthResponse = await response.json();

    // Store tokens in HTTP-only cookies
    await setTokens(data.accessToken, data.refreshToken);

    // Return user data (without tokens in response body)
    return NextResponse.json({
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      image: data.image,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
