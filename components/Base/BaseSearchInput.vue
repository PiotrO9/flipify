<template>
    <div class="search-input">
        <input type="text" :value="searchTerm" :placeholder="props.placeholder" class="search-box"
            @input="updateSearchTerm">
        <ul v-if="searchTerm && filteredItems.length" class="results">
            <li v-for="(item, index) in filteredItems" :key="index" class="item">
                {{ item }}
            </li>
        </ul>
        <p v-if="searchTerm && !filteredItems.length" class="no-results">
            No items found.
        </p>
    </div>
</template>

<script setup lang="ts">
interface BaseSearchInputPropsMode {
    placeholder: string;
    name?: string;
}

const props = defineProps<BaseSearchInputPropsMode>();

const items = ref<string[]>(['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape']);

const searchTerm = ref<string>('');

const filteredItems = computed(() => {
    return items.value.filter(item =>
        item.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

function updateSearchTerm(event: Event) {
    const target = event.target as HTMLInputElement;

    searchTerm.value = target.value;
}
</script>

<style scoped>
.search-input {
    max-width: 320px;
    width: 100%;

    .search-box {
        width: 100%;
        padding: 8px;
        border: 1px solid var(--gray-300);
    }

    .results {
        list-style-type: none;
        padding: 0;
        margin-top: 5px;

        .item {
            margin: 5px 0;
            padding: 2px 5px;
            background-color: var(--color-secondary);
            cursor: pointer;

            &:hover {
                background-color: var(--gray-300);
            }
        }
    }

    .no-results {
        color: var(--text-color);
        padding: 5px;
    }
}
</style>
