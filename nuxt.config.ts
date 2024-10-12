export default defineNuxtConfig({
	devtools: { enabled: true },
	css: ['./assets/styles/app.css'],
	modules: ['@nuxt/eslint', '@nuxtjs/color-mode', '@nuxt/icon'],
	typescript: {
		typeCheck: true,
	},
	plugins: ['~/plugins/pinia.js'],
	eslint: {
		checker: true,
		config: {
			stylistic: true,
		},
	},
	runtimeConfig: {
		public: {
			API_BASE_URL: process.env.BACKEND_SERVER_ADRES,
		},
	},
})
