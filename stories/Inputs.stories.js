import { fn } from '@storybook/test';
import BaseInput from '../components/Base/BaseInput.vue';

export default {
    title: 'Example/Inputs',
    component: BaseInput,
    tags: ['autodocs'],
    argTypes: {
        label: {
            control: 'text'
        },
        name: {
            control: 'text'
        },
        type: {
            control: { type: 'select' },
            options: ['text', 'number', 'email']
        },
        outlineColor: {
            control: 'text'
        }
    },
    args: { onClick: fn() }
};

export const Input = {
    args: {
        label: 'test',
        type: 'text',
        name: 'test',
        outlineColor: '#000'
    }
};
