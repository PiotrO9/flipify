<script setup lang='ts'>
import { baseButtonTypes } from '~/types/prop-models/enums/base-button-types';
import { useNotificationStore } from '~/stores/notificationStore';
import { NotificationTypes } from '~/types/enums/notificationTypes';

definePageMeta({
    colorMode: 'light',
    layout: 'auth'
})

const runtimeConfig = useRuntimeConfig();

const username = ref('');
const password = ref('');

const notificationStore = useNotificationStore()

async function handleLoginButtonSubmitClick() {
    const endpoint = `${runtimeConfig.public.API_BASE_URL}/auth/login`;

    const { data, error } = await useFetch<{ token: string }>(endpoint, {
        method: 'post',
        body: {
            username: username.value,
            password: password.value,
        },
        onResponseError({ response }) {
            if (response) {
                switch (response.status) {
                    case 400: {
                        notificationStore.setNotification({
                            title: `No credentials`,
                            description: "You must to fill credentials",
                            type: NotificationTypes.ALERT
                        })
                    }
                    case 401: {
                        if (response._data.error) {
                            notificationStore.setNotification({
                                title: `Verify you e-mail`,
                                description: "Check your mail and verify your account",
                                type: NotificationTypes.ALERT
                            })
                        }
                        else {
                            notificationStore.setNotification({
                                title: `Wrong credentials`,
                                description: "Username or password are wrong",
                                type: NotificationTypes.ALERT
                            })
                        }
                    }
                }
            } else {
                notificationStore.setNotification({
                    title: `Error`,
                    description: "Network or unknown error occurred",
                    type: NotificationTypes.ALERT
                })
            }
        },
    });

    if (data.value) {
        // TODO
        // Handle token

        // authService.setToken(data.value.token)
        // navigateTo('flipcards')
    }
}
</script>

<template>
    <form class="login auth-card" @submit.prevent>
        <div class="auth-card-title-wrapper">
            <h1 class="auth-card-title">
                Login
            </h1>
        </div>
        <BaseInput type="text" placeholder="Username" icon-name="uil:user" v-model="username" />
        <BaseInput type="password" placeholder="Password" icon-name="mdi:password-outline" v-model="password" />
        <div class="forgot-password-wrapper auth-extra-option-wrapper">
            <span class="auth-extra-option-wrapper-prompt">
                Forgot password?
            </span>
            <NuxtLink to="forgot-password" class="auth-extra-option-wrapper-link">
                Remind password
            </NuxtLink>
        </div>
        <BaseButton :button-type="baseButtonTypes.primary" label="Log in"
            :onClickFunction="handleLoginButtonSubmitClick" />
        <div class="register-prompt-wrapper auth-extra-option-wrapper">
            <span class="auth-extra-option-wrapper-prompt">
                Not member yet?
            </span>

            <NuxtLink to="register" class="auth-extra-option-wrapper-link">
                Register
            </NuxtLink>
        </div>
    </form>
</template>