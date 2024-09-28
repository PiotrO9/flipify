<script setup lang="ts">
import { NotificationTypes } from '~/types/enums/notificationTypes';
import { baseButtonTypes, controlSizes } from '../../types/prop-models/enums/base-button-types';
import { useNotificationStore } from '~/stores/notificationStore';

interface baseButtonPropsModel {
    label: string;
    buttonType: baseButtonTypes;
    size?: controlSizes;
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

    if (props.size) {
        classNames.push(props.size);
    }

    return classNames.join(' ');
});

const props = withDefaults(defineProps<baseButtonPropsModel>(), { isLoading: false, isDisable: false, size: controlSizes.small });

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
    border: 2px solid var(--background-color-negative);
    width: max-content;
    height: max-content;
    word-break: break-word;
    transition: background-color 0.3s ease-in-out, border 0.3s ease-in-out, color 0.3s ease-in-out;

    &.primary {
        background-color: var(--button-primary-background);
        border: 2px solid var(--button-primary-border);
        color: var(--button-primary-text);

        &:hover {
            background-color: var(--button-primary-background-hover);
            border: 2px solid var(--button-primary-border-hover);
            color: var(--button-primary-text-hover);
        }
    }

    &.secondary {
        background-color: var(--button-secondary-background);
        border: 2px solid var(--button-secondary-border);
        color: var(--button-secondary-text);

        &:hover {
            background-color: var(--button-secondary-background-hover);
            border: 2px solid var(--button-secondary-border-hover);
            color: var(--button-secondary-text-hover);
        }
    }

    &.small {
        padding: 12px 30px;
        max-width: 320px;

        .text {
            font-size: 20px;
        }
    }

    &.medium {
        padding: 15px 40px;
        max-width: 400px;

        .text {
            font-size: 24px
        }
    }

    &.large {
        padding: 20px 40px;
        max-width: 450px;

        .text {
            font-size: 28px
        }
    }

    .text {
        text-align: center;
        color: inherit;
        font-weight: 700;
        letter-spacing: .5px;
    }
}
</style>
