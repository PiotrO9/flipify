<script setup lang='ts'>
import { authService } from '~/services/authService';
definePageMeta({
    layout: 'default',
    colorMode: 'light',
    middleware: 'auth'
})

function handleLogoutButtonClick() {
    authService.clearToken()
    navigateTo('/')
}
</script>

<template>
    <div>
        <h1>flipcards</h1>
        <button @click="handleLogoutButtonClick">
            logout
        </button>
    </div>
</template>