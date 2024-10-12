<script setup lang="ts">
import { baseButtonTypes } from '../../types/prop-models/enums/base-button-types';

interface baseButtonPropsModel {
    label: string;
    buttonType: baseButtonTypes;
    isLoading?: boolean;
    isDisable?: boolean;
    onClickFunction?: (event?: MouseEvent) => void;
}

const styles = computed(() => {
    const classNames: string[] = [];

    if (props.buttonType != baseButtonTypes.other) {
        classNames.push(props.buttonType);
    }

    return classNames.join(' ');
});

const props = withDefaults(defineProps<baseButtonPropsModel>(), { isLoading: false, isDisable: false });

function handleButtonClick() {
    if (props.onClickFunction) {
        props.onClickFunction();
    }
}
</script>

<template>
    <button class="button" :class="styles" @click="handleButtonClick">
        <span class="text">
            {{ props.label }}
        </span>
    </button>
</template>

<style scoped>
.button {
    border-radius: var(--border-radius);
    width: 100%;
    height: max-content;
    padding: 20px;
    word-break: break-word;
    transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out, color 0.3s ease-in-out;

    &.primary {
        background-color: var(--button-primary-background);
        color: var(--button-primary-text);

        &:hover {
            background-color: var(--button-primary-background-hover);
            color: var(--button-primary-text-hover);
        }
    }

    &.secondary {
        background-color: var(--button-secondary-background);
        color: var(--button-secondary-text);

        &:hover {
            background-color: var(--button-secondary-background-hover);
            color: var(--button-secondary-text-hover);
        }
    }

    .text {
        text-align: center;
        color: inherit;
        font-weight: 700;
        font-size: 1rem;
        letter-spacing: .5px;
    }
}
</style>
