<script setup lang='ts'>
import type flipcardSetModel from '~/types/flipcard-sets';

definePageMeta({
    layout: 'default',
    colorMode: 'light',
    middleware: 'auth'
})

const flipcardsSets = ref<flipcardSetModel[]>(await useFetch("/api/flipcards/sets").data.value)

console.log(flipcardsSets.value);

// async function handleLogoutButtonClick() {
//     await $fetch("/api/auth/logout", {
//         method: 'POST'
//     }).finally(() => {
//         navigateTo("/")
//     });
// }
</script>

<template>
    <div>
        <h1>
            flipcards
        </h1>
        <FlipcardSetPreviewCard v-for="(flipcardSet, index) in flipcardsSets" :key="index" />
    </div>
</template>