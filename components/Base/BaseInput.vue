<script setup lang="ts">

interface baseInputPropsModel {
    type: InputType
    name?: string
    placeholder?: string
    iconName?: string
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


const { type, name, iconName } = defineProps<baseInputPropsModel>();
</script>

<template>
    <div class="input-wrapper">
        <input :type="type" class="input" :name="name" :placeholder="placeholder" />
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
