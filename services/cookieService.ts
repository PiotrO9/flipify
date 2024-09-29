// ~/services/cookieService.ts

interface CookieOptions {
	expiresIn?: number
	path?: string
	secure?: boolean
	httpOnly?: boolean
	sameSite?: 'Lax' | 'Strict' | 'None'
}

export class CookieService {
	private getNamespacedKey(key: string, namespace: string = 'app'): string {
		return `${namespace}:${key}`
	}

	set(
		key: string,
		value: string,
		options?: CookieOptions,
		namespace?: string,
	): void {
		const namespacedKey = this.getNamespacedKey(key, namespace)
		const cookieParts = [`${namespacedKey}=${encodeURIComponent(value)}`]

		if (options?.expiresIn) {
			const expires = new Date(
				Date.now() + options.expiresIn * 1000,
			).toUTCString()
			cookieParts.push(`Expires=${expires}`)
		}

		cookieParts.push(`Path=${options?.path || '/'}`)

		if (options?.secure) {
			cookieParts.push('Secure')
		}

		if (options?.sameSite) {
			cookieParts.push(`SameSite=${options.sameSite}`)
		}

		document.cookie = cookieParts.join('; ')
	}

	get(key: string, namespace?: string): string | null {
		const namespacedKey = this.getNamespacedKey(key, namespace)
		const cookies = document.cookie ? document.cookie.split('; ') : []
		for (const cookie of cookies) {
			const [cookieKey, cookieValue] = cookie.split('=')
			if (cookieKey === namespacedKey) {
				return decodeURIComponent(cookieValue)
			}
		}
		return null
	}

	remove(key: string, namespace?: string): void {
		this.set(key, '', { expiresIn: -1 }, namespace)
	}

	clear(namespace?: string): void {
		const cookies = document.cookie ? document.cookie.split('; ') : []
		for (const cookie of cookies) {
			const [cookieKey] = cookie.split('=')
			if (!namespace || cookieKey.startsWith(`${namespace}:`)) {
				this.remove(cookieKey.replace(`${namespace}:`, ''), namespace)
			}
		}
	}
}

export const cookieService = new CookieService()
