<script setup lang='ts'>
import { formattingService } from '~/services/formattingService';
import type { flipcardModel } from '~/types/flipcard-models';

interface flipcardDataModel {
    flipcardData: flipcardModel;
}

const { flipcardData } = defineProps<flipcardDataModel>();

const isFlipped = ref(false);

function handleOptionsClick() {
    // TODO
}

function handleFlipcardToggleFlipState() {
    isFlipped.value = !isFlipped.value;
}

const formatedLastReviewDate = computed(() => formattingService.formatDate(flipcardData.lastReviewDate));
</script>

<template>
    <div v-if="flipcardData" class="flipcard">
        <div :class="['flipcard-inner', { 'is-flipped': isFlipped }]">
            <div class="flipcard-side flipcard-front">
                <div class="flipcard-preview-upper-part" @click="handleFlipcardToggleFlipState">
                    <span class="flipcard-set-name">
                        {{ flipcardData.nativeWord }}
                    </span>
                    <span class="flipcard-description">
                        {{ flipcardData.nativeWordExample }}
                    </span>
                </div>
                <div class="flipcard-date-wrapper" @click="handleFlipcardToggleFlipState">
                    <Icon name="fluent-mdl2:date-time" />
                    <span class="last-review-date">
                        {{ formatedLastReviewDate }}
                    </span>
                </div>
                <div class="flipcard-preview-bottom-part">
                    <div class="flipcard-preview-bottom-wrapper">
                        <div class="options-wrapper" @click="handleOptionsClick">
                            <Icon name="tabler:dots" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="flipcard-side flipcard-back">
                <div class="flipcard-preview-upper-part" @click="handleFlipcardToggleFlipState">
                    <span class="flipcard-set-name">
                        {{ flipcardData.foreignWord }}
                    </span>
                    <span class="flipcard-description">
                        {{ flipcardData.foreignWordExample }}
                    </span>
                </div>
                <div class="flipcard-date-wrapper" @click="handleFlipcardToggleFlipState">
                    <Icon name="fluent-mdl2:date-time" />
                    <span class="last-review-date">
                        {{ formatedLastReviewDate }}
                    </span>
                </div>
                <div class="flipcard-preview-bottom-part">
                    <div class="flipcard-preview-bottom-wrapper">
                        <div class="options-wrapper" @click="handleOptionsClick">
                            <Icon name="tabler:dots" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.flipcard {
    perspective: 1000px;
}

.flipcard-inner {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 0.6s;
}

.flipcard-inner.is-flipped {
    transform: rotateY(180deg);
}

.flipcard-side {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
}

.flipcard-back {
    transform: rotateY(180deg);
}

.flipcard-preview-upper-part {
    padding: 12px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-align: center;

    .flipcard-set-name {
        font-weight: 700;
        font-size: 1.4rem;
    }

    .flipcard-description {
        font-size: 1rem;
    }
}

.flipcard-date-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
    cursor: pointer;
}

.flipcard-preview-bottom-part {
    .flipcard-preview-bottom-wrapper {
        padding: 12px;
        display: flex;
        justify-content: flex-end;
        background-color: var(--gray-500);

        .options-wrapper {
            cursor: pointer;
        }
    }
}
</style>