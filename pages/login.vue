<script setup lang='ts'>
import { baseButtonTypes } from '~/types/prop-models/enums/base-button-types';
import { useNotificationStore } from '~/stores/notificationStore';
import { NotificationTypes } from '~/types/enums/notificationTypes';

definePageMeta({
    colorMode: 'light',
    layout: 'auth',
    middleware: 'login'
})

const username = ref('');
const password = ref('');

const notificationStore = useNotificationStore()

async function handleLoginButtonSubmitClick() {
    await useFetch("/api/auth/login", {
        method: 'post',
        body: {
            username: username.value,
            password: password.value,
        }
    }).then((res) => {
        if (res.error.value) {
            switch (res.error.value.statusCode) {
                case 400: {
                    notificationStore.setNotification({
                        title: `No credentials`,
                        description: "You must to fill credentials",
                        type: NotificationTypes.ALERT
                    })
                    break;
                }
                case 401: {
                    notificationStore.setNotification({
                        title: res.error.value.data.statusMessage,
                        description: res.error.value.data.data.errors,
                        type: NotificationTypes.ALERT
                    })
                    break;
                }
                default: {
                    notificationStore.setNotification({
                        title: res.error.value.data.statusMessage,
                        description: res.error.value.data.data.errors,
                        type: NotificationTypes.ALERT
                    })
                    break;
                }

            }
        }
        else {
            navigateTo("/flipcards");
        }
    })
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