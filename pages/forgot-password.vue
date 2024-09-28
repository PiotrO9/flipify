<script setup lang='ts'>
import { baseButtonTypes } from '~/types/prop-models/enums/base-button-types';

definePageMeta({
    colorMode: 'light',
    layout: 'auth'
})
</script>

<template>
    <div class="remind-password auth-card">
        <div class="auth-card-title-wrapper">
            <h1 class="auth-card-title">
                Remind password
            </h1>
        </div>
        <BaseInput type="email" placeholder="E-mail" icon-name="uil:user" />
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

<style scoped></style>