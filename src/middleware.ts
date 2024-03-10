import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  console.log(path);
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const publicPaths = path === "/Auth/login" || path === "/Auth/register";

  if (publicPaths && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  if (!publicPaths && !token) {
    return NextResponse.redirect(new URL("/Auth/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/dashboard", "/Auth/register", "/Auth/login"],
};
