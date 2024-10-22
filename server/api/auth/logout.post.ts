import axios from 'axios'
import https from 'https'
import { defineEventHandler, createError, getCookie } from 'h3'

export default defineEventHandler(async (event) => {
	const endpoint = `${process.env.BACKEND_SERVER_ADRES}/auth/logout`

	const accessToken = getCookie(event, 'accessToken')

	if (!accessToken) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Token expired',
			data: { error: 'An error occurred during logout.' },
		})
	}

	try {
		await axios.post(
			endpoint,
			{},
			{
				headers: {
					Cookie: `accessToken=${accessToken}`,
				},
				httpsAgent: new https.Agent({
					rejectUnauthorized: false,
				}),
				withCredentials: true,
			},
		)

		return { message: 'Logout successful' }
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			throw createError({
				statusCode: error.response.status,
				statusMessage: 'Error during logout',
				data: { error: 'An error occurred during logout.' },
			})
		} else {
			throw createError({
				statusCode: 500,
				statusMessage: 'Network error',
				data: { error: 'Network or unknown error occurred.' },
			})
		}
	} finally {
		deleteCookie(event, 'accessToken')
	}
})
