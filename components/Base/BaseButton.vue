<script setup lang="ts">
import { NotificationTypes } from '@/types/enums/notificationTypes';
import { baseButtonTypes, controlSizes } from '../../types/prop-models/enums/base-button-types';
import { useNotificationStore } from '@/stores/notificationStore';

interface baseButtonPropsModel {
    label: string;
    buttonType: baseButtonTypes;
    isLoading?: boolean;
    isDisable?: boolean;
    onClickFunction?: Function;
}

const notificationStore = useNotificationStore();

const styles = computed(() => {
    const classNames: string[] = [];

    if (props.buttonType != baseButtonTypes.other) {
        classNames.push(props.buttonType);
    }

    return classNames.join(' ');
});

const props = withDefaults(defineProps<baseButtonPropsModel>(), { isLoading: false, isDisable: false });

function handleButtonClick() {
    notificationStore.setNotification({
        title: "Test notification",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut",
        type: NotificationTypes.ALERT,
    })
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
        font-size: 16rem;
        letter-spacing: .5px;
    }
}
</style>
