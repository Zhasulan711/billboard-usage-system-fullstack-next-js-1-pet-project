// import { auth } from "./auth";
import NextAuth from "next-auth";

import authConfig from "@/auth.config";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/../routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // req.auth
  //   const isLoggedIn = !!req.auth;
  //   console.log("ROUTE: ", req.nextUrl.pathname);
  //   console.log("IS LOGGED IN: ", isLoggedIn);
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; //false

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    // return new Response(null, { status: 200 });
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    // return new Response(null, { status: 200 });
    return;
  }
  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl); 
    return Response.redirect(new URL(`auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
  }
  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
