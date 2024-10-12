<script setup lang='ts'>
definePageMeta({
    layout: 'default',
    colorMode: 'light',
})

function handleLogoutButtonClick() {
    // TODO
    // authService.clearToken()
    // navigateTo('/')
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