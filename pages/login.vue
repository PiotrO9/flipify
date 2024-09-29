<script setup lang='ts'>
import { baseButtonTypes } from '~/types/prop-models/enums/base-button-types';
import { ApiService } from '~/services/apiService';
import { authService } from '~/services/authService';

definePageMeta({
    colorMode: 'light',
    layout: 'auth'
})

const apiService = new ApiService(
    'https://localhost:7191/api',
)

const email = ref('');
const password = ref('');

function handleLoginButtonSubmitClick() {
    apiService.post<{ token: string }>('/auth/login', {
        "username": email.value,
        "password": password.value
    })
        .then((res) => {
            if (res?.data.token) {
                authService.setToken(res.data.token)
                navigateTo('flipcards')
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
        <BaseInput type="text" placeholder="Username" icon-name="uil:user" v-model="email" />
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