'use client';

import type { ColorMode, ThemeName, ThemeProviderProps as ThemeProps, UseThemeProps } from './types';
import * as React from 'react';

const MEDIA = '(prefers-color-scheme: dark)';
const isServer = typeof window === 'undefined';
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = {
  theme: undefined,
  colorMode: undefined,
  setTheme: () => {},
  setColorMode: () => {},
  resolvedTheme: 'default-light',
  systemColorMode: 'light',
};

const saveToLS = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
    document.cookie = `${key}=${value}; path=/; max-age=31536000`; // 1 year
  } catch (e) {
    console.error(e);
  }
};

export const useTheme = () => React.use(ThemeContext) ?? defaultContext;

export const ThemeProvider = (props: ThemeProps) => {
  const context = React.use(ThemeContext);
  const isRoot = !context;
  return <Theme {...props} isRoot={isRoot} />;
};

const Theme = ({
  defaultTheme = 'default',
  defaultColorMode = 'system',
  enableSystem = true,
  children,
  isRoot,
}: ThemeProps & { isRoot: boolean }) => {
  const globalContext = React.use(ThemeContext);
  const globalColorMode = globalContext?.colorMode;
  // const globalResolvedTheme = globalContext?.resolvedTheme ?? 'default-light';

  const [theme, setThemeState] = React.useState<ThemeName | undefined>(() => // Explicitly type theme state
    isRoot ? getTheme('theme', defaultTheme) as ThemeName | undefined : getTheme('theme-pc', 'inherit') as ThemeName | undefined,
  );
  const [colorMode, setColorModeState] = React.useState<ColorMode | undefined>(() => // Explicitly type colorMode state
    isRoot ? getTheme('color-mode', defaultColorMode) as ColorMode | undefined : getTheme('color-mode-pc', 'inherit') as ColorMode | undefined,
  );
  const [systemColorMode, setSystemColorMode] = React.useState<'light' | 'dark'>(getSystemColorMode); // Explicitly type systemColorMode state

  const effectiveTheme = isRoot ? theme : (theme === 'inherit' ? globalContext?.theme ?? defaultTheme : theme);
  const effectiveColorMode = isRoot
    ? colorMode
    : (colorMode === 'inherit' ? globalColorMode ?? defaultColorMode : colorMode);
  const resolvedColorMode = effectiveColorMode === 'system' ? systemColorMode : effectiveColorMode;
  const resolvedTheme = `${effectiveTheme}-${resolvedColorMode}`; // Removed unnecessary ?? 'default-light'

  const applyTheme = React.useCallback(() => {
    if (isServer) {
      return;
    }
    const updates: [string, string][] = [];
    if (isRoot) {
      updates.push(['data-global-theme', resolvedTheme]);
    } else {
      updates.push(['data-pc-theme', resolvedTheme]);
    }
    updates.forEach(([attr, value]) => document.documentElement.setAttribute(attr, value));
  }, [isRoot, resolvedTheme]);

  React.useLayoutEffect(() => {
    applyTheme();
  }, [applyTheme]);

  React.useEffect(() => {
    if (!enableSystem) {
      return;
    }
    const media = window.matchMedia(MEDIA);
    const handleChange = (e: MediaQueryListEvent) => {
      console.warn('System color mode changed to:', e.matches ? 'dark' : 'light');
      setSystemColorMode(e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [enableSystem]);

  const setTheme = React.useCallback((newTheme: ThemeName) => { // Update parameter type
    setThemeState(newTheme);
    saveToLS(isRoot ? 'theme' : 'theme-pc', newTheme);
  }, [isRoot]);

  const setColorMode = React.useCallback((newColorMode: ColorMode) => { // Update parameter type
    setColorModeState(newColorMode);
    saveToLS(isRoot ? 'color-mode' : 'color-mode-pc', newColorMode);
  }, [isRoot]);

  const providerValue = React.useMemo((): UseThemeProps => ({
    theme,
    colorMode,
    setTheme,
    setColorMode,
    resolvedTheme,
    systemColorMode,
  }), [theme, colorMode, setTheme, setColorMode, resolvedTheme, systemColorMode]);

  return (
    <ThemeContext value={providerValue}>
      {isRoot ? children : <div data-theme-pc="true">{children}</div>}
    </ThemeContext>
  );
};

const getTheme = (key: string, fallback: string): string => { // Revert return type to string
  if (isServer) {
    return fallback;
  }
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const getSystemColorMode = (): 'light' | 'dark' => { // Keep explicit union type
  if (isServer) {
    return 'light';
  }
  return window.matchMedia(MEDIA).matches ? 'dark' : 'light';
};
