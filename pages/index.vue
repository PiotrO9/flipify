<script setup lang='ts'>

definePageMeta({
    layout: 'homepage',
    colorMode: 'light'
})
</script>

<template>
    <div>
        <NuxtLink to="login">
            login
        </NuxtLink>
        <NuxtLink to="flipcards">
            flipcards
        </NuxtLink>
    </div>
</template>