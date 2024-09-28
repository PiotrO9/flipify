import { defineStore } from 'pinia'
import type { NotificationTypes } from '~/types/enums/notificationTypes'

interface Notification {
	isNotificationVisible: boolean
	notificationTitle: string
	notificationDescription: string
	notificationType: NotificationTypes
	notificationIcon?: string
	timestamp: Date
}

interface NotificationState {
	isNotificationVisible: boolean
	notificationTitle: string
	notificationDescription: string
	notificationType: NotificationTypes
	notificationIcon?: string
	history: Notification[]
}

export const useNotificationStore = defineStore('notificationStore', {
	state: (): NotificationState => ({
		isNotificationVisible: false,
		notificationTitle: '',
		notificationDescription: '',
		notificationType: 'default' as NotificationTypes,
		notificationIcon: '',
		history: [],
	}),
	getters: {
		visibility: (state) => state.isNotificationVisible,
		title: (state) => state.notificationTitle,
		description: (state) => state.notificationDescription,
		type: (state) => state.notificationType,
		icon: (state) => state.notificationIcon,
		notificationHistory: (state) => state.history,
	},
	actions: {
		setNotification({
			title,
			description,
			type,
			icon,
		}: {
			title: string
			description: string
			type: NotificationTypes
			icon?: string
		}) {
			this.isNotificationVisible = true
			this.notificationTitle = title
			this.notificationDescription = description
			this.notificationType = type
			this.notificationIcon = icon || ''

			this.history.push({
				isNotificationVisible: true,
				notificationTitle: title,
				notificationDescription: description,
				notificationType: type,
				notificationIcon: icon || '',
				timestamp: new Date(),
			})
		},
		clearNotification() {
			this.isNotificationVisible = false
			this.notificationTitle = ''
			this.notificationDescription = ''
			this.notificationType = 'default' as NotificationTypes
			this.notificationIcon = ''
		},
		clearHistory() {
			this.history = []
		},
	},
})
