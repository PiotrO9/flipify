<script setup lang="ts">
import { ref } from 'vue'
import type { flipcardModel } from '~/types/flipcard-models'
import { useRoute, useFetch } from '#app'
import { useNotificationStore } from '~/stores/notificationStore';
import { NotificationTypes } from '~/types/enums/notificationTypes';

definePageMeta({
    layout: 'default',
    colorMode: 'light',
    middleware: 'auth'
})

const route = useRoute()
const setId = route.params.id as string

const notificationStore = useNotificationStore()

const flipcards = ref<flipcardModel[] | null>(null)

const { data, error } = await useFetch<flipcardModel[]>(`/api/flipcards/${setId}`)

if (error.value) {
    if (error.value.statusCode === 404) {
        notificationStore.setNotification({
            title: 'Flipcard Set Not Found',
            description: 'The flipcard set was not found or does not belong to the user.',
            type: NotificationTypes.ALERT
        })
    } else if (error.value.statusCode === 401) {
        notificationStore.setNotification({
            title: 'Unauthorized',
            description: 'You are not authorized to access this flipcard set.',
            type: NotificationTypes.ALERT
        })
    } else {
        notificationStore.setNotification({
            title: error.value.statusMessage || 'An Error Occurred',
            description: error.value.data?.error || 'Something went wrong while fetching the flipcards.',
            type: NotificationTypes.ALERT
        })
    }
} else if (data.value) {
    flipcards.value = data.value
}
</script>

<template>
    <div class="flipcards-module module-container">
        <div class="flipcards-content-container">
            <FlipcardPreview v-for="flipcard in flipcards" :key="flipcard.id" :flipcard-data="flipcard" />
        </div>
    </div>
</template>

<style scoped>
.flipcards-content-container {
    width: 100%;
}
</style>