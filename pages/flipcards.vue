<script setup lang='ts'>
definePageMeta({
    layout: 'default',
    colorMode: 'light',
    middleware: 'auth'
})

async function handleLogoutButtonClick() {
    await useFetch("/api/auth/logout", {
        method: 'POST'
    }).then(() => {
        navigateTo("/")
    });
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