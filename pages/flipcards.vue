<script setup lang='ts'>
definePageMeta({
    layout: 'default',
    colorMode: 'light',
    middleware: 'auth'
})

async function handleLogoutButtonClick() {
    await $fetch("/api/auth/logout", {
        method: 'POST'
    }).finally(() => {
        navigateTo("/")
    });
}

async function getFlipcardSets() {
    // await $fetch("/api/")
}
</script>

<template>
    <div>
        <h1>
            flipcards
        </h1>

        <button @click="handleLogoutButtonClick">
            logout
        </button>
    </div>
</template>