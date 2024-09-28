import { HttpMethod } from '~/types/enums/httpMethodsTypes'
import { useNotificationStore } from '~/stores/notificationStore'
import { NotificationTypes } from '~/types/enums/notificationTypes'

interface ApiResponse<T> {
	success: boolean
	message: string
	data: T
	statusCode: number
}

export class ApiService {
	private api

	private notificationStore

	constructor(
		notificationStore: ReturnType<typeof useNotificationStore>,
		baseURL: string = '',
	) {
		this.notificationStore = notificationStore
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
	): Promise<T | null> {
		try {
			let config = { method, body: data, ...options }
			if (interceptor) {
				config = interceptor(config)
			}

			const response: ApiResponse<T> = await this.api<ApiResponse<T>>(
				url,
				config,
			)

			if (response.success) {
				return response.data
			} else {
				this.notificationStore.setNotification({
					title: 'Error',
					description: response.message,
					type: NotificationTypes.ALERT,
				})
				return response.data
			}
		} catch (error: any) {
			this.handleError(error)
			return error.data
		}
	}

	async get<T>(
		url: string,
		options: any = {},
		interceptor?: (config: any) => any,
	): Promise<T | null> {
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
	): Promise<T | null> {
		return this.request<T>(HttpMethod.POST, url, data, options, interceptor)
	}

	async put<T>(
		url: string,
		data: any,
		options: any = {},
		interceptor?: (config: any) => any,
	): Promise<T | null> {
		return this.request<T>(HttpMethod.PUT, url, data, options, interceptor)
	}

	async delete<T>(
		url: string,
		options: any = {},
		interceptor?: (config: any) => any,
	): Promise<T | null> {
		return this.request<T>(
			HttpMethod.DELETE,
			url,
			undefined,
			options,
			interceptor,
		)
	}

	private handleError(error: any): void {
		const description = error?.data?.message ? error?.data?.message : error

		this.notificationStore.setNotification({
			title: 'Error',
			description: description,
			type: NotificationTypes.ALERT,
		})
	}
}
