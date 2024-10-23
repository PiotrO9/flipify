import type { FetchError } from 'ofetch'

export default defineNuxtRouteMiddleware(async (to, from) => {
	if (process.client) {
		try {
			await $fetch('/api/auth/validate-token', {
				method: 'get',
				credentials: 'include',
			})
		} catch (error) {
			const fetchError = error as FetchError

			if (fetchError.statusCode == 401) {
				return navigateTo('/login')
			}
		}
	}
})
