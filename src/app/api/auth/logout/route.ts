import { NextRequest, NextResponse } from "next/server";
import { clearTokens } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    // Clear tokens from cookies
    await clearTokens();

    return NextResponse.json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
