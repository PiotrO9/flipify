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
    box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);

    .header-app-name {
        font-weight: 500;
        font-size: 24rem;
    }
}
</style>