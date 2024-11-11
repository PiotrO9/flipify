<template>
    <div class="flipcard-module-card flipcards-empty-container">
        <span class='text'>
            Add flipcard
        </span>
        <div class="add-set-button-wrapper">
            <button>
                <NuxtLink to="/flipcards/add-flipcard">
                    <Icon name="zondicons:add-outline" class="icon" />
                </NuxtLink>
            </button>
        </div>
    </div>
</template>

<style scoped>
.flipcard-module-card {
    height: 100%;
    justify-content: center;
    padding: 12px;
}
</style>