import { defineEventHandler, getCookie, createError } from 'h3'
import axios from 'axios'
import { axiosInstance } from '~/utils/axios'
import type { FetchError } from 'ofetch'

export default defineEventHandler(async (event) => {
	const setId = event.context.params?.id
	if (!setId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Set ID missing',
			data: { error: 'Set ID is required' },
		})
	}

	const accessToken = getCookie(event, 'accessToken')
	if (!accessToken) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Unauthorized',
			data: { error: 'Access token is missing' },
		})
	}

	const endpoint = `${process.env.BACKEND_SERVER_ADRES}/flipcards/get-flipcards-from-set`

	const body = {
		setId: setId.toString(),
	}

	try {
		const response = await axiosInstance.post(endpoint, body, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				Cookie: `accessToken=${accessToken}`,
			},
			withCredentials: true,
		})

		return response.data
	} catch (error) {
		const fetchError = error as FetchError

		if (axios.isAxiosError(error) && error.response) {
			if (error.response.status === 404) {
				throw createError({
					statusCode: 404,
					statusMessage:
						'Flipcard set not found or does not belong to the user.',
					data: {
						error: 'Flipcard set not found or does not belong to the user.',
					},
				})
			}

			throw createError({
				statusCode: error.response.status,
				statusMessage: 'Failed to fetch flipcards',
				data: { error: fetchError.message },
			})
		} else {
			throw createError({
				statusCode: 500,
				statusMessage: 'Server Error',
				data: { error: 'An unexpected error occurred' },
			})
		}
	}
})
