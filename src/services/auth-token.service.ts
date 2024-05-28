import Cookies from 'js-cookie'

export enum EnumTokens {
	ACCESS_TOKEN = 'accessToken',
	REFRESH_TOKEN = 'refreshToken'
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}
export const saveTokenStorage = (accessToken: string) => {
	console.log(process.env.NEXT_PUBLIC_COOKIE_DOMAIN)
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
		sameSite: 'strict',
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
}