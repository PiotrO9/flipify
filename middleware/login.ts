export default defineNuxtRouteMiddleware(async (to, from) => {
	try {
		await $fetch('/api/auth/validate-token', {
			method: 'get',
			credentials: 'include',
		})

		return navigateTo('/flipcards')
	} catch {}
})
