import { authService } from '~/services/authService'

export default defineNuxtRouteMiddleware((to) => {
	const isAuthenticated = authService.isAuthenticated()

	const nonAuthenticatedAccessPaths = ['', 'login', 'register']

	if (!isAuthenticated && !nonAuthenticatedAccessPaths.includes(to.path)) {
		return navigateTo('/')
	}
})
