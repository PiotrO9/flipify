import { cookieService } from '~/services/cookieService'

class AuthService {
	private tokenKey = 'authToken'
	private cookieNamespace = 'auth'

	setToken(token: string): void {
		cookieService.set(
			this.tokenKey,
			token,
			{
				expiresIn: 60 * 60 * 24,
				path: '/',
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'Strict',
			},
			this.cookieNamespace,
		)
	}

	getToken(): string | null {
		return cookieService.get(this.tokenKey, this.cookieNamespace)
	}

	clearToken(): void {
		cookieService.remove(this.tokenKey, this.cookieNamespace)
	}

	isAuthenticated(): boolean {
		return !!this.getToken()
	}

	authInterceptor(config: any): any {
		const token = this.getToken()
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token}`,
			}
		}
		return config
	}
}

export const authService = new AuthService()
