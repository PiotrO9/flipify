import { defineEventHandler, getCookie } from 'h3'
import axios from 'axios'
import https from 'https'

export default defineEventHandler(async (event) => {
	const endpoint = `${process.env.BACKEND_SERVER_ADRES}/auth/validate-token`
	const accessToken = getCookie(event, 'accessToken')

	if (!accessToken) {
		throw createError({
			statusCode: 401,
			statusMessage: 'Token expired',
			data: { error: 'An error occurred during logout.' },
		})
	}

	try {
		const response = await axios.get(endpoint, {
			headers: {
				Cookie: `accessToken=${accessToken}`,
			},
			httpsAgent: new https.Agent({
				rejectUnauthorized: false,
			}),
			withCredentials: true,
		})

		return response.data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return { error: 'Token validation failed. Redirecting to login.' }
		}
	}
})
