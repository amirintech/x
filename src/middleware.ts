import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_ROUTES = ['/auth', '/api/uploadthing']

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
}

const JWT_SECRET = process.env.JWT_SECRET!

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const pathname = req.nextUrl.pathname

  if (token && pathname === '/auth') return NextResponse.redirect(new URL('/', req.url))

  if (isPublicRoute(pathname)) return NextResponse.next()

  if (!token) return NextResponse.redirect(new URL('/auth', req.url))

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return NextResponse.next()
  } catch (e) {
    return NextResponse.redirect(new URL('/auth', req.url))
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
