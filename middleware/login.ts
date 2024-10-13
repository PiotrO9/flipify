export default defineNuxtRouteMiddleware(async (to, from) => {
	if (to.name != from.name) {
		try {
			const responese = await $fetch('/api/auth/validate-token', {
				method: 'get',
				credentials: 'include',
			})

			return navigateTo('/flipcards')
		} catch (error) {}
	}
})
