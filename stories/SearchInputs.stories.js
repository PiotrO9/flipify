import { fn } from '@storybook/test';
import BaseSearchInput from '../components/Base/BaseSearchInput.vue';

export default {
    title: 'Example/SearchInputs',
    component: BaseSearchInput,
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text'
        },
        name: {
            control: 'text'
        }
    },
    args: { onClick: fn() }
};

export const Input = {
    args: {
        name: 'test',
        placeholder: 'placeholder'
    }
};
