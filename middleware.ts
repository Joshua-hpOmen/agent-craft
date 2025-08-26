import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/auth(.*)',
  '/portal(.*)'
])

export default clerkMiddleware(async (auth, req) => {
 if(!isPublicRoute(req)){
    const userID = (await auth()).userId
    if(!userID) NextResponse.redirect(new URL("/auth/sign-up", req.url))
 } 

 return NextResponse.next()
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next/|favicon.ico|chatbot|.*\\.(?:js|css|json|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};