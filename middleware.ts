import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Public routes
        if (
          pathname.startsWith('/login') ||
          pathname.startsWith('/register') ||
          pathname.startsWith('/auth') ||
          pathname === '/' ||
          pathname.startsWith('/about') ||
          pathname.startsWith('/contact') ||
          pathname.startsWith('/explore') ||
          pathname.startsWith('/anime') ||
          pathname.startsWith('/api/auth')
        ) {
          return true
        }

        // Protected routes require authentication
        if (
          pathname.startsWith('/dashboard') ||
          pathname.startsWith('/profile') ||
          pathname.startsWith('/library') ||
          pathname.startsWith('/api/user')
        ) {
          return !!token
        }

        // Admin routes require admin role
        if (
          pathname.startsWith('/admin') ||
          pathname.startsWith('/api/admin')
        ) {
          return token?.role === 'admin'
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}