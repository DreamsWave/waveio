import type { StorybookConfig } from '@storybook/nextjs';
import webpack from 'webpack';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
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
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
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

    // Update CSS handling
    if (config.module?.rules) {
      // Remove existing CSS rules
      config.module.rules = config.module.rules.filter(
        rule => rule && typeof rule === 'object' && 'test' in rule && !rule.test?.toString().includes('css'),
      );

      // Add our CSS rules
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  '@tailwindcss/postcss',
                  'autoprefixer',
                ],
              },
            },
          },
        ],
      });
    }

    return config;
  },
};

export default config;
