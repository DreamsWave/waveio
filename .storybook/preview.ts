import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import { THEMES } from '@/utils/constants';
import '../src/styles/global.css';

const themes = THEMES.reduce((acc, theme) => ({
  ...acc,
  [`${theme}`]: `${theme}-light`,
  [`${theme} (dark)`]: `${theme}-dark`,
}), {});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: '', color: '#ffffff' },
        { name: 'dark', class: 'dark', color: '#000000' },
      ],
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes,
      defaultTheme: 'default',
      attributeName: 'data-global-theme',
    }),
  ],
};

export default preview;
