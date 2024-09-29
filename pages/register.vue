<script setup lang='ts'>
import { baseButtonTypes } from '~/types/prop-models/enums/base-button-types';
import { ApiService, type ApiResponse } from '~/services/apiService';
import { useNotificationStore } from '~/stores/notificationStore';
import { NotificationTypes } from '~/types/enums/notificationTypes';

definePageMeta({
    colorMode: 'light',
    layout: 'auth'
})

const username = ref('');
const email = ref('');
const password = ref('');

const apiService = new ApiService(
    'https://localhost:7191/api',
)

function handleRegisterButtonSubmitClick() {
    apiService.post<string>('/auth/register', {
        "username": username.value,
        "email": email.value,
        "password": password.value
    })
        .then((res) => {
            if (res) {
                const notificationStore = useNotificationStore()

                notificationStore.setNotification({
                    title: res.message,
                    description: res.data,
                    type: NotificationTypes.CORRECT
                })

                username.value = '';
                email.value = '';
                password.value = '';
            }
        })
}
</script>

<template>
    <form class="register auth-card" @submit.prevent>
        <div class="auth-card-title-wrapper">
            <h1 class="auth-card-title">
                Register
            </h1>
        </div>
        <BaseInput type="text" placeholder="Username" icon-name="uil:user" v-model="username" />
        <BaseInput type="email" placeholder="E-mail" icon-name="uil:user" v-model="email" />
        <BaseInput type="password" placeholder="Password" icon-name="mdi:password-outline" v-model="password" />
        <BaseButton :button-type="baseButtonTypes.primary" label="Register"
            :onClickFunction="handleRegisterButtonSubmitClick" />
        <div class="login-prompt-wrapper auth-extra-option-wrapper">
            <span class="auth-extra-option-wrapper-prompt">
                Already user?
            </span>

            <NuxtLink to="login" class="auth-extra-option-wrapper-link">
                Login
            </NuxtLink>
        </div>
    </form>
</template>