import {
	localStorageService,
	sessionStorageService,
} from '~/services/storageService'

class AuthService {
	private tokenKey = 'authToken'
	private storageType: 'localStorage' | 'sessionStorage' = 'localStorage'
	private storageService =
		this.storageType === 'localStorage'
			? localStorageService
			: sessionStorageService

	setToken(token: string): void {
		this.storageService.set(this.tokenKey, token, {
			expiresIn: 60 * 60 * 24,
		})
	}

	getToken(): string | null {
		return this.storageService.get<string>(this.tokenKey)
	}

	clearToken(): void {
		this.storageService.remove(this.tokenKey)
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
