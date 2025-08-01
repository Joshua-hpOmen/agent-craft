import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const isPublicRoute = createRouteMatcher([
  '/',
  '/auth(.*)',
  '/portal(.*)'
])

export default clerkMiddleware(async (auth, req) => {
 if(!isPublicRoute(req)){
    redirect('/auth/sign-up')
 } 
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next/|favicon.ico|chatbot|.*\\.(?:js|css|json|png|jpg|jpeg|gif|svg|ico|woff2?|ttf|eot|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};