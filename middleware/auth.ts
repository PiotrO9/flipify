import { authService } from '~/services/authService'

export default defineNuxtRouteMiddleware((to) => {
	const isAuthenticated = authService.isAuthenticated()

	if (!isAuthenticated) {
		return navigateTo('/')
	}
})
