import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("미들웨어 실행 체크중!@@");
  if (request.nextUrl.pathname.startsWith("/products/1004")) {
    console.log("미들웨어 경로 리다이렉팅!@@");
    return NextResponse.redirect(new URL("/products", request.url));
  }
}

export const config = {
  matcher: ["/products/:path+"],
};
