import type { StorybookConfig } from '@storybook/nextjs';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },

  // Weird webpack moment, idk
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        worker_threads: false,
      };
      config.resolve.alias = {
        ...config.resolve.alias,
        'node:http': false,
        'node:https': false,
      };
    }

    if (!config.plugins) {
      config.plugins = [];
    }

    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /@logtail\/node/,
        require.resolve('./empty-module.js'),
      ),
    );

    return config;
  },
};

export default config;
