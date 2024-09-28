<template>
    <AppHeader />
    <main class="auth-layout">
        <slot />
    </main>
</template>

<style scoped>
.auth-layout {
    height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>