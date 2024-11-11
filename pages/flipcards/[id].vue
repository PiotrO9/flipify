<script setup lang='ts'>
import type { flipcardModel } from '~/types/flipcard-models';

definePageMeta({
    layout: 'default',
    colorMode: 'light',
    middleware: 'auth'
})

const route = useRoute()
const setId = route.params.id as string

const { data: flipcards } = await useFetch<flipcardModel[]>(`/api/flipcards/${setId}`);
</script>

<template>
    <div>
        działa
    </div>
</template>