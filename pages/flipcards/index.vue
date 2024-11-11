<script setup lang='ts'>
import type { flipcardSetModel } from '~/types/flipcard-models';

definePageMeta({
    layout: 'default',
    colorMode: 'light',
    middleware: 'auth'
})

const { data: flipcardsSets } = await useFetch<flipcardSetModel[]>("/api/flipcards/sets");
</script>

<template>
    <div class="flipcards-module module-container">
        <div class="flipcards-content-container">
            <FlipcardSetPreviewCard v-for="(flipcardSet, index) in flipcardsSets" :key="index"
                :flipcard-set="flipcardSet" />
        </div>
    </div>
</template>