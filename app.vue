<script setup lang="ts">
const defaultLayoutName = 'default';

</script>

<template>
    <Notification />
    <NuxtLayout :name="defaultLayoutName">
        <NuxtPage />
    </NuxtLayout>
</template>
