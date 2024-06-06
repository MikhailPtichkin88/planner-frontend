import { EnumTokens } from './services/auth-token.service'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest, response: NextResponse) {
	const { url, cookies } = request

	const refreshToken = cookies.get(EnumTokens.REFRESH_TOKEN)?.value
	const accessToken = cookies.get(EnumTokens.ACCESS_TOKEN)?.value

	const isAuthPage = url.includes('/auth')


	if (isAuthPage && refreshToken && accessToken) {
		return NextResponse.redirect(new URL("/planner_app/i", url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (!refreshToken || !accessToken) {
		return NextResponse.redirect(new URL('/planner_app/auth', url))
	}

	const isHomePage = request?.nextUrl?.pathname === '/' || request?.nextUrl?.pathname === '/planner_app'
	if (isHomePage) {
		if (!refreshToken || !accessToken) {
			return NextResponse.redirect(new URL('/planner_app/auth', url))
		} else {
			return NextResponse.redirect(new URL("/planner_app/i", url))
		}
	}
	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/i', '/auth', '/planner_app', '/planner_app/i/:path*', '/planner_app/auth/:path']
}
