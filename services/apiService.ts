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
			onResponseError: (context) => {
				const { response } = context
				if (response.status >= 400 && response.status < 600) {
					const errorData = response._data

					let errorsCommunicates: string[] = []

					if (errorData.errors) {
						Object.keys(errorData.errors).forEach((errorKey) => {
							const errorValues = errorData.errors[errorKey]

							if (
								Array.isArray(errorValues) &&
								errorValues.length
							) {
								errorValues.forEach((errorValue) => {
									errorsCommunicates.push(errorValue)
								})
							}
						})
					}

					this.notificationStore.setNotification({
						title: errorData.title,
						description: errorsCommunicates.join('. '),
						type: NotificationTypes.ALERT,
					})
				}
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

			const response = await this.api<ApiResponse<T>>(url, config)

			if (response.success) {
				return response.data
			}
			return null
		} catch (error) {
			return null
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
}
