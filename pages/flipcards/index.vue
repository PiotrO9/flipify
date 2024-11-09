<script setup lang='ts'>
import type flipcardSetModel from '~/types/flipcard-sets';

definePageMeta({
    layout: 'default',
    colorMode: 'light',
    middleware: 'auth'
})

const { data: flipcardsSets } = await useFetch<flipcardSetModel[]>("/api/flipcards/sets");

//TODO
// async function handleLogoutButtonClick() {
//     await $fetch("/api/auth/logout", {
//         method: 'POST'
//     }).finally(() => {
//         navigateTo("/")
//     });
// }
</script>

<template>
    <div class="flipcards-module">
        <div class="flipcards-sets-cotnainer">
            <FlipcardSetPreviewCard v-for="(flipcardSet, index) in flipcardsSets" :key="index"
                :flipcard-set="flipcardSet" />
        </div>
    </div>
</template>

<style>
.flipcards-module {
    height: calc(100dvh - 80px);
    margin-top: 80px;
    display: flex;
    width: 100%;
    max-width: 1680px;
    padding: 20px;
}

.flipcards-sets-cotnainer {
    display: flex;
    flex-direction: column;
    gap: 30px;
    height: max-content;

    @media (width > 640px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (width > 960px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    @media (width > 1240px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
    }
}
</style>