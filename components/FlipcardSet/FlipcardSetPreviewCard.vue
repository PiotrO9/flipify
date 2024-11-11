<script setup lang='ts'>
import type { flipcardSetModel } from '~/types/flipcard-models';

const { flipcardSet } = defineProps<{
    flipcardSet: flipcardSetModel
}>();

function handleSetClick() {
    navigateTo(`/flipcards/${flipcardSet.id}`);
}
</script>

<template>
    <div class="flipcard-set-card-preview">
        <div class="flipcard-set-card-preview-upper-part" @click="handleSetClick">
            <div class="flipcard-set-card-preview-top-wrapper">
                <span class="flipcard-set-name">
                    {{ flipcardSet.name }}
                </span>
                <div class="add-to-favorite">
                    <Icon name="solar:star-linear" />
                </div>
            </div>
            <span class="flipcard-set-card-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit
                anim id est laborum.
            </span>
            <div class="flipcard-set-card-preview-additional-info">
                <div class="languages">
                    <span class="base-language">
                        {{ flipcardSet.baseLanguage }}
                    </span>
                    <Icon name="fluent:arrow-right-12-filled" />
                    <span class="foreign-language">
                        {{ flipcardSet.foreignLanguage }}
                    </span>
                </div>
                <div class="flipcards-count-wrapper">
                    <Icon name="streamline:cards" />
                    <span class="flipcards-count">
                        {{ flipcardSet.flipcardCount }}
                    </span>
                </div>
            </div>
        </div>
        <div class="flipcard-set-card-preview-bottom-part">
            <div class="flipcard-set-card-preview-bottom-wrapper">
                <div class="options-wrapper">
                    <Icon name="tabler:dots" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flipcard-set-card-preview {
    display: flex;
    flex-direction: column;
    height: max-content;
    border-radius: var(--border-radius);
    border: 2px solid var(--gray-400);
    background-color: var(--background-color);

    .flipcard-set-card-preview-upper-part {
        padding: 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        cursor: pointer;

        .flipcard-set-card-preview-top-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .flipcard-set-name {
                font-size: 1.4rem;
                font-weight: 700;
            }

            .add-to-favorite {
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        .flipcard-set-card-description {
            font-size: 1rem;
        }

        .flipcard-set-card-preview-additional-info {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .languages {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }

            .flipcards-count-wrapper {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;

                .flipcards-count {
                    font-weight: 700;
                }
            }
        }
    }

    .flipcard-set-card-preview-bottom-part {
        .flipcard-set-card-preview-bottom-wrapper {
            display: flex;
            justify-content: flex-end;
            background-color: var(--gray-500);
            padding: 12px;

            .options-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;

                span {
                    height: 24px;
                    width: 24px;
                    background-color: var(--color-primary);
                    cursor: pointer;
                }
            }
        } }
}
</style>