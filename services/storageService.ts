type StorageType = 'localStorage' | 'sessionStorage'

interface StorageOptions {
	expiresIn?: number
}

class StorageService {
	private storage: Storage

	constructor(type: StorageType = 'localStorage') {
		this.storage =
			type === 'localStorage'
				? window.localStorage
				: window.sessionStorage
	}

	private getNamespacedKey(key: string, namespace: string = 'app'): string {
		return `${namespace}:${key}`
	}

	set<T>(
		key: string,
		value: T,
		options?: StorageOptions,
		namespace?: string,
	): void {
		try {
			const namespacedKey = this.getNamespacedKey(key, namespace)
			const data = {
				value,
				timestamp: Date.now(),
				expiresIn: options?.expiresIn,
			}
			this.storage.setItem(namespacedKey, JSON.stringify(data))
		} catch (error) {
			console.error('Failed to set item in storage:', error)
		}
	}

	get<T>(key: string, namespace?: string): T | null {
		try {
			const namespacedKey = this.getNamespacedKey(key, namespace)
			const item = this.storage.getItem(namespacedKey)

			if (!item) return null

			const { value, timestamp, expiresIn } = JSON.parse(item)

			if (expiresIn && Date.now() > timestamp + expiresIn) {
				this.remove(key, namespace)
				return null
			}

			return value as T
		} catch (error) {
			console.error('Failed to get item from storage:', error)
			return null
		}
	}

	remove(key: string, namespace?: string): void {
		try {
			const namespacedKey = this.getNamespacedKey(key, namespace)
			this.storage.removeItem(namespacedKey)
		} catch (error) {
			console.error('Failed to remove item from storage:', error)
		}
	}

	clear(namespace?: string): void {
		try {
			if (namespace) {
				Object.keys(this.storage).forEach((key) => {
					if (key.startsWith(`${namespace}:`)) {
						this.storage.removeItem(key)
					}
				})
			} else {
				this.storage.clear()
			}
		} catch (error) {
			console.error('Failed to clear storage:', error)
		}
	}
}

export const localStorageService = new StorageService('localStorage')
export const sessionStorageService = new StorageService('sessionStorage')
