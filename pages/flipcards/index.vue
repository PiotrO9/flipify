<script setup lang='ts'>
import AddFlipcardSetPreviewCard from '~/components/FlipcardSet/AddFlipcardSetPreviewCard.vue';
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
        <div v-if="flipcardsSets?.length" class="flipcards-content-container">
            <FlipcardSetPreviewCard v-for="(flipcardSet, index) in flipcardsSets" :key="index"
                :flipcard-set="flipcardSet" />
            <AddFlipcardSetPreviewCard />
        </div>
        <div v-else class="flipcards-empty-container">
            <span class='text'>
                You have no flipcards sets
            </span>
            <div class="add-set-button-wrapper">
                <button>
                    <NuxtLink to="/flipcards/add-set">
                        <Icon name="zondicons:add-outline" class="icon" />
                    </NuxtLink>
                </button>
            </div>
        </div>
    </div>
</template>