/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
        '@storybook/preset-scss'
    ],
    framework: {
        name: '@storybook/vue3-vite',
        options: {}
    },
    async viteFinal(config, { configType }) {
        const { mergeConfig } = require('vite');

        return mergeConfig(config, {
            css: {
                preprocessorOptions: {
                    scss: {
                        additionalData: ``
                    }
                }
            }
        });
    },
    docs: {
        autodocs: 'tag'
    }
};

export default config;
