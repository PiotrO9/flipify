<script setup lang='ts'>
import { baseButtonTypes } from '~/types/prop-models/enums/base-button-types';
import { useNotificationStore } from '~/stores/notificationStore';
import { NotificationTypes } from '~/types/enums/notificationTypes';

definePageMeta({
    colorMode: 'light',
    layout: 'auth'
})

const runtimeConfig = useRuntimeConfig();
const notificationStore = useNotificationStore()

const username = ref('');
const email = ref('');
const password = ref('');

async function handleRegisterButtonSubmitClick() {
    const endpoint = `${runtimeConfig.public.API_BASE_URL}/auth/register`;

    const { data } = await useFetch(endpoint, {
        method: 'post',
        body: {
            username: username.value,
            password: password.value,
            email: email.value,
        },
        onResponseError({ response }) {
            if (response) {
                if (response.status === 400) {
                    if (response._data.errors) {
                        const errors = response._data.errors;

                        const errorReasons = Object.keys(errors).map((error) => {
                            if (errors[error].length) {
                                return errors[error][0]
                            }
                        })

                        const description = errorReasons.join(". ");

                        notificationStore.setNotification({
                            title: `Validation ${errorReasons.length > 1 ? 'errors' : 'error'}`,
                            description: description,
                            type: NotificationTypes.ALERT
                        })
                    }

                    if (response._data.error) {
                        notificationStore.setNotification({
                            title: 'User already exist',
                            description: 'There is existing user with that credentials',
                            type: NotificationTypes.ALERT
                        })
                    }
                }
            }
            else {
                notificationStore.setNotification({
                    title: `Error`,
                    description: "Network or unknown error occurred",
                    type: NotificationTypes.ALERT
                })
            }
        }
    })

    if (data.value) {
        notificationStore.setNotification({
            title: `User created successfully`,
            description: "Please verify your email",
            type: NotificationTypes.CORRECT
        })
    }
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