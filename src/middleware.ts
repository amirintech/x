import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/auth', '/api/webhooks(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const { isAuthenticated } = await auth()

  // Redirect to home page if user is authenticated and on auth page
  if (isAuthenticated && req.nextUrl.pathname === '/auth') return NextResponse.redirect(new URL('/', req.url))

  // Allow access to public routes
  if (isAuthenticated || isPublicRoute(req)) return NextResponse.next()

  // Redirect to auth page if user is not authenticated and on a non-public route
  if (!isAuthenticated) return NextResponse.redirect(new URL('/auth', req.url))
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
