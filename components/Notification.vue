<script setup lang='ts'>
import { useNotificationStore } from '~/stores/notificationStore';
import { NotificationTypes } from '~/types/enums/notificationTypes';

const notificationStore = useNotificationStore();

const selectedIconClassName = ref('');

const isNotificationVisible = computed(() => notificationStore.visibility);
const notificationTitle = computed(() => notificationStore.title);
const notificationDescription = computed(() => notificationStore.description);
const iconName = computed(() => {
    if (notificationStore.icon) {
        switch (notificationStore.icon) {
            case NotificationTypes.CORRECT: {
                selectedIconClassName.value = 'correct';
                return 'pajamas:check-circle';
            }
            case NotificationTypes.ALERT: {
                selectedIconClassName.value = 'alert';
                return 'pajamas:abuse'
            }
            case NotificationTypes.WARNING: {
                selectedIconClassName.value = 'warning';
                return 'pajamas:abuse'
            }
        }
    }

    selectedIconClassName.value = 'information';
    return 'pajamas:information-o';
})

function handleCloseButtonClick(event: Event) {
    event.stopPropagation();
    notificationStore.clearNotification()
}
</script>

<template>
    <Transition name="fade" appear>
        <div v-if="isNotificationVisible" class="notification-overlay" @click="handleCloseButtonClick"></div>
    </Transition>
    <Transition name="slide" appear v-if="isNotificationVisible">
        <div class="notification-container">
            <div class="notification-container-header-wrapper">
                <div class="static-data-wrapper">
                    <div class="notification-icon-wrapper">
                        <Icon :name="iconName" class="selected-icon" :class="selectedIconClassName" />
                    </div>
                    <div class="notification-title-wrapper">
                        <span class="notification-title">{{ notificationTitle }}</span>
                    </div>
                </div>
                <div class="notification-close-wrapper">
                    <button class="notification-close-button" @click="handleCloseButtonClick">
                        <Icon name="pajamas:close" />
                    </button>
                </div>
            </div>
            <div class="notification-container-content">
                <span class="notification-description">
                    {{ notificationDescription }}
                </span>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.notification-overlay {
    background-color: var(--background-color-negative);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    inset: 0;
    z-index: 1;
    cursor: pointer;
    opacity: 0.6;
    padding: 20px;
    transition: opacity 0.5s ease-in-out;
}

.notification-container {
    max-width: calc(100% - 40px);
    width: 100%;
    display: flex;
    height: max-content;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    z-index: 1;
    padding: 20px;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    opacity: 1;
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
    cursor: default;

    @media (width >=640px) {
        max-width: 600px;
    }

    .notification-icon-wrapper {
        display: flex;
        align-items: center;

        .iconify {
            height: 40px;
            width: 40px;

            &.correct {
                color: var(--color-succes);
            }

            &.alert {
                color: var(--color-error);
            }

            &.warning {
                color: var(--color-warning);
            }

            &.information {
                color: var(--text-color);
            }
        }
    }

    .notification-title-wrapper {
        display: flex;
        align-items: center;

        .notification-title {
            font-size: 24rem;
            font-weight: 500;

            @media (width >=640px) {
                font-size: 36rem;
            }
        }
    }

    .notification-container-header-wrapper {
        display: flex;
        gap: 0.8rem;

        .static-data-wrapper {
            width: 100%;
            display: flex;
            gap: 10px;
        }

        .notification-close-wrapper {
            .notification-close-button {
                display: flex;
                align-items: center;
                cursor: pointer;

                .iconify {
                    height: 20px;
                    width: 20px;
                    color: var(--text-color);
                }
            }
        }
    }

    .notification-container-content {
        .notification-description {
            font-size: 16rem;
        }
    }
}

.slide-enter-from,
.slide-leave-to {
    transform: translateY(-5dvh);
    opacity: 0;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>