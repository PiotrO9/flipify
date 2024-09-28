import { fn } from '@storybook/test';
import BaseButton from '../components/Base/BaseButton.vue';

export default {
    title: 'Example/Buttons',
    component: BaseButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'medium', 'large'],
            description: 'Size'
        },
        buttonType: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'other'],
            description: 'Type of button'
        },
        isLoading: {
            control: { type: 'boolean' }
        },
        isDisable: {
            control: { type: 'boolean' }
        }
    },
    args: { onClick: fn() }
};

export const Primary = {
    args: {
        label: 'Button',
        buttonType: 'primary'
    }
};

export const Secondary = {
    args: {
        label: 'Button',
        buttonType: 'secondary'
    }
};

export const Small = {
    args: {
        label: 'Button',
        buttonType: 'primary',
        size: 'small'
    }
};

export const Medium = {
    args: {
        label: 'Button',
        buttonType: 'primary',
        size: 'medium'
    }
};

export const Large = {
    args: {
        label: 'Button',
        buttonType: 'primary',
        size: 'large'
    }
};
