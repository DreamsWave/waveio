'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTheme } from '@/libs/theme';
import { COLOR_MODES, THEMES } from '@/utils/constants';
import { useEffect, useState } from 'react';

export const ThemeToggles = ({ type }: { type: 'global' | 'pc' }) => {
  const { theme, colorMode, setTheme, setColorMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function changeTheme(theme: string) {
    setTheme(theme);
  }

  function changeColorMode(colorMode: string) {
    setColorMode(colorMode);
  }

  const themes = type === 'pc' ? ['inherit', ...THEMES] : THEMES;
  const colorModes = type === 'pc' ? ['inherit', ...COLOR_MODES] : COLOR_MODES;

  return (
    <section data-testid={`${type}-themes`} className={`${type}-themes`}>
      <div className="mb-4">
        <h3>
          {type === 'global' ? 'Global' : 'PC'}
          {' '}
          Theme:
          {mounted ? theme : 'Loading...'}
        </h3>
        <Select
          value={mounted ? theme : 'default'} // Default to 'default' when not mounted
          onValueChange={changeTheme}
          disabled={!mounted}
        >
          <SelectTrigger
            className="w-[180px]"
            data-testid={`${type}-theme-select-trigger`}
          >
            <SelectValue placeholder={mounted ? 'Select theme' : 'Loading...'} />
          </SelectTrigger>
          <SelectContent>
            {themes.map(t => (
              <SelectItem key={t} value={t} data-testid={`${type}-theme-${t}`}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <h3>
          {type === 'global' ? 'Global' : 'PC'}
          {' '}
          Color Mode:
          {mounted ? colorMode : 'Loading...'}
        </h3>
        <Select
          value={mounted ? colorMode : 'system'} // Default to 'system' when not mounted
          onValueChange={changeColorMode}
          disabled={!mounted}
        >
          <SelectTrigger
            className="w-[180px]"
            data-testid={`${type}-color-mode-select-trigger`}
          >
            <SelectValue placeholder={mounted ? 'Select color mode' : 'Loading...'} />
          </SelectTrigger>
          <SelectContent>
            {colorModes.map(cm => (
              <SelectItem key={cm} value={cm} data-testid={`${type}-color-mode-${cm}`}>
                {cm}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};
