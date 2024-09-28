<script setup lang='ts'>
import { baseButtonTypes } from '~/types/prop-models/enums/base-button-types';

definePageMeta({
    colorMode: 'light',
    layout: 'auth'
})
</script>

<template>
    <div class="login auth-card">
        <div class="auth-card-title-wrapper">
            <h1 class="auth-card-title">
                Login
            </h1>
        </div>
        <BaseInput type="email" placeholder="E-mail" icon-name="uil:user" />
        <BaseInput type="password" placeholder="Password" icon-name="mdi:password-outline" />
        <div class="forgot-password-wrapper auth-extra-option-wrapper">
            <span class="auth-extra-option-wrapper-prompt">
                Forgot password?
            </span>
            <NuxtLink to="forgot-password" class="auth-extra-option-wrapper-link">
                Remind password
            </NuxtLink>
        </div>
        <BaseButton :button-type="baseButtonTypes.primary" label="Log in" />
        <div class="register-prompt-wrapper auth-extra-option-wrapper">
            <span class="auth-extra-option-wrapper-prompt">
                Not member yet?
            </span>

            <NuxtLink to="register" class="auth-extra-option-wrapper-link">
                Register
            </NuxtLink>
        </div>
    </div>
</template>