'use client';

import { useTheme } from '@/libs/theme';
import { useEffect, useState } from 'react';

export const ThemeToggles = ({ type }: { type: 'global' | 'pc' }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.warn('ThemeToggles', { type, theme, resolvedTheme });
  }, [theme, resolvedTheme, type]);

  const themeMapping: Record<string, string> = {
    'light': 'Light',
    'dark': 'Dark',
    'retro-light': 'Retro (light)',
    'retro-dark': 'Retro (dark)',
    'blue-light': 'Blue (light)',
    'blue-dark': 'Blue (dark)',
    'green-light': 'Green (light)',
    'green-dark': 'Green (dark)',
    'purple-light': 'Purple (light)',
    'purple-dark': 'Purple (dark)',
  };

  return (
    <section data-testid={`${type}-themes`} className={`${type}-themes`}>
      <h2>{type === 'global' ? 'Global Themes' : 'PC Themes'}</h2>
      <div className="grid grid-cols-3 grid-rows-2 grid-flow-col gap-4">
        {Object.entries(themeMapping).map(([key, value]) => (
          <button
            type="button"
            key={key}
            data-testid={`${type}-theme-${key}`}
            className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 ${
              mounted && (theme === key || (theme === 'system' && resolvedTheme === key))
                ? 'border border-primary bg-primary-foreground text-primary'
                : 'bg-primary text-primary-foreground'
            }`}
            onClick={() => {
              setTheme(key);
            }}
          >
            {value}
          </button>
        ))}
      </div>
    </section>
  );
};
