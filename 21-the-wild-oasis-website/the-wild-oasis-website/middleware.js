import { auth } from "@/app/_lib/auth";
/*
// * Next middleware; redirecting
import { NextResponse } from "next/server";

export const middleware = (request) => {
  return NextResponse.redirect(new URL("/about", request.url));
};

export const config = {
  matcher: ["/account", "/cabins"],
};
*/

export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
