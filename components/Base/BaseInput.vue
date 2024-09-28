<script setup lang="ts">
interface baseInputPropsModel {
    type: InputType
    name?: string
    placeholder?: string
    iconName?: string
    modelValue?: string // Add modelValue prop to handle v-model
}

type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

const { type, name, placeholder, iconName, modelValue } = defineProps<baseInputPropsModel>();

const emit = defineEmits(['update:modelValue']); // Define emit for v-model

// Function to emit the value change
const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
};
</script>

<template>
    <div class="input-wrapper">
        <input :type="type" class="input" :name="name" :placeholder="placeholder" :value="modelValue"
            @input="onInput" />
        <Icon v-if="iconName" :name="iconName" class="icon" />
    </div>
</template>

<style scoped>
.input-wrapper {
    width: 100%;
    display: flex;
    height: 55px;
    position: relative;
    padding: 10px;
    border: 1px solid var(--input-border);
    border-radius: var(--border-radius);
    background-color: var(--background-color);

    .input {
        width: 100%;
        outline: none;
        border: none;
        font-size: 16rem;
        background-color: inherit;

        &::placeholder {
            font-size: 16rem;
        }
    }

    .icon {
        width: 28px;
        height: 28px;
        position: absolute;
        right: 10px;
        top: 50%;
        translate: 0 -50%;
    }
}
</style>
