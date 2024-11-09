<script setup lang='ts'>

</script>

<template>
    <header class="header">
        <NuxtLink class="header-app-name" to="/">
            Flipify
        </NuxtLink>
    </header>
</template>

<style scoped>
.header {
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px;
    position: fixed;
    inset: 0 0 0;
    color: var(--color-primary);
    background-color: var(--background-color);
    z-index: 2;

    .header-app-name {
        font-weight: 500;
        font-size: 2.5rem;
    }
}
</style>