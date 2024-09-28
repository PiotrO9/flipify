<script setup lang="ts">

interface baseInputPropsModel {
    label: string
    type: InputType
    name?: string
    borderColor?: string
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


const props = defineProps<baseInputPropsModel>();
</script>

<template>
    <div class="input-wrapper">
        <label :for="props.name" class="label">
            {{ props.label }}
        </label>
        <input :type="props.type" class="input" :name="props.name" :style="{ borderColor: props.borderColor }">
    </div>
</template>

<style scoped>
.input-wrapper {
    max-width: 320px;
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;

    label {
        position: absolute;
        bottom: 13px;
        left: 15px;
        transition: transform 0.3s;
        background-color: var(--background-color);
        padding: 2px 5px;
        font-size: 16rem;

        &:has(+ input:focus) {
            transform: translateY(-20px);
        }
    }

    .input {
        height: 45px;
        margin-top: 20px;
        padding: 10px;
        border: 2px solid var(--input-border);
        border-radius: var(--border-radius);
    }
}
</style>
