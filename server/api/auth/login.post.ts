import axios from 'axios'
import { axiosInstance } from '~/utils/axios'
import { defineEventHandler, readBody, createError } from 'h3'

interface LoginBody {
	username: string
	password: string
}

export default defineEventHandler(async (event) => {
	const endpoint = `${process.env.BACKEND_SERVER_ADRES}/auth/login`

	const body: LoginBody = await readBody(event)

	const credentials = {
		username: body.username,
		password: body.password,
	}

	try {
		const response = await axiosInstance.post(endpoint, credentials, {
			withCredentials: true,
		})

		const setCookieHeader = response.headers['set-cookie']
		const accessTokenCookie = setCookieHeader?.find((cookie) =>
			cookie.startsWith('accessToken='),
		)

		if (accessTokenCookie) {
			const accessToken = accessTokenCookie.split(';')[0].split('=')[1]

			const expiryDate = new Date()
			expiryDate.setMinutes(expiryDate.getMinutes() + 15)

			setCookie(event, 'accessToken', accessToken, {
				httpOnly: true,
				expires: expiryDate,
			})
		}

		return { message: 'Login successful' }
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			switch (error.response.status) {
				case 400:
					throw createError({
						statusCode: 400,
						statusMessage: 'No credentials',
						data: { error: 'You must fill in credentials.' },
					})
				case 401:
					throw createError({
						statusCode: 401,
						statusMessage: 'Authorization error',
						data: {
							errors: error.response.data.error,
						},
					})
				default:
					throw createError({
						statusCode: error.response.status,
						statusMessage: 'Error',
						data: { error: 'Network or unknown error occurred.' },
					})
			}
		} else {
			throw createError({
				statusCode: 500,
				statusMessage: 'Error',
				data: { error: 'Network or unknown error occurred.' },
			})
		}
	}
})
