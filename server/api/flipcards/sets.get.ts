import { defineEventHandler, getCookie } from 'h3'
import type { FetchError } from 'ofetch'
import { axiosInstance } from '~/utils/axios'
import axios from 'axios'

export default defineEventHandler(async (event) => {
	const endpoint = `${process.env.BACKEND_SERVER_ADRES}/flipcards/my-sets`
	const accessToken = getCookie(event, 'accessToken')

	if (!accessToken) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Sets failed',
			data: { error: 'An error occurred during sets requesting.' },
		})
	}

	try {
		const response = await axiosInstance.get(endpoint, {
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
			throw createError({
				statusCode: 401,
				statusMessage: 'Sets failed',
				data: { error: fetchError.message },
			})
		}
	}
})
