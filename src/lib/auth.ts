import { cookies } from "next/headers";

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function setTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();

  cookieStore.set(TOKEN_KEY, accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  cookieStore.set(REFRESH_TOKEN_KEY, refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });
}

export async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value;
}

export async function getRefreshToken() {
  const cookieStore = await cookies();
  return cookieStore.get(REFRESH_TOKEN_KEY)?.value;
}

export async function clearTokens() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
  cookieStore.delete(REFRESH_TOKEN_KEY);
}
