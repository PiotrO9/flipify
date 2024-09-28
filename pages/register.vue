<script setup lang='ts'>
import { baseButtonTypes } from '~/types/prop-models/enums/base-button-types';

definePageMeta({
    colorMode: 'light',
    layout: 'auth'
})
</script>

<template>
    <div class="register auth-card">
        <div class="auth-card-title-wrapper">
            <h1 class="auth-card-title">
                Register
            </h1>
        </div>
        <BaseInput type="email" placeholder="E-mail" icon-name="uil:user" />
        <BaseInput type="password" placeholder="Password" icon-name="mdi:password-outline" />
        <BaseButton :button-type="baseButtonTypes.primary" label="Register" />
        <div class="login-prompt-wrapper auth-extra-option-wrapper">
            <span class="auth-extra-option-wrapper-prompt">
                Already user?
            </span>

            <NuxtLink to="login" class="auth-extra-option-wrapper-link">
                Login
            </NuxtLink>
        </div>
    </div>
</template>