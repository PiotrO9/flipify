import { HttpMethod } from '~/types/enums/httpMethodsTypes'

interface ApiResponse<T> {
	success: boolean
	message: string
	data: T
	statusCode: number
}

class ApiService {
	private api

	constructor(baseURL: string = '') {
		this.api = $fetch.create({
			baseURL: baseURL,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	async request<T>(
		method: HttpMethod,
		url: string,
		data?: any,
		options: any = {},
		interceptor?: (config: any) => any,
	): Promise<T> {
		try {
			let config = { method, body: data, ...options }
			if (interceptor) {
				config = interceptor(config)
			}

			const response: ApiResponse<T> = await this.api(url, config)

			if (response.success) {
				return response.data
			} else {
				throw new Error(
					response.message || 'An unknown error occurred.',
				)
			}
		} catch (error: any) {
			this.handleError(error)
			throw error
		}
	}

	async get<T>(
		url: string,
		options: any = {},
		interceptor?: (config: any) => any,
	): Promise<T> {
		return this.request<T>(
			HttpMethod.GET,
			url,
			undefined,
			options,
			interceptor,
		)
	}

	async post<T>(
		url: string,
		data: any,
		options: any = {},
		interceptor?: (config: any) => any,
	): Promise<T> {
		return this.request<T>(HttpMethod.POST, url, data, options, interceptor)
	}

	async put<T>(
		url: string,
		data: any,
		options: any = {},
		interceptor?: (config: any) => any,
	): Promise<T> {
		return this.request<T>(HttpMethod.PUT, url, data, options, interceptor)
	}

	async delete<T>(
		url: string,
		options: any = {},
		interceptor?: (config: any) => any,
	): Promise<T> {
		return this.request<T>(
			HttpMethod.DELETE,
			url,
			undefined,
			options,
			interceptor,
		)
	}

	private handleError(error: any): void {
		if (error?.data?.message) {
			console.error('API Error Message:', error.data.message)
		} else {
			console.error('API Error:', error)
		}
	}
}

export const apiService = new ApiService('https://api.example.com')
