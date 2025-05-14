'use client';

import type { ThemeProviderProps as ThemeProps, UseThemeProps } from './types';
import * as React from 'react';

const MEDIA = '(prefers-color-scheme: dark)';
const isServer = typeof window === 'undefined';
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = {
  theme: undefined,
  colorMode: undefined,
  setTheme: () => {},
  setColorMode: () => {},
  resolvedTheme: '',
  systemColorMode: '',
};

const saveToLS = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
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
  // storageKey = 'theme',
  // themes = THEMES,
  defaultTheme = 'default',
  defaultColorMode = 'system',
  enableSystem = true,
  children,
  isRoot,
}: ThemeProps & { isRoot: boolean }) => {
  const globalContext = React.use(ThemeContext);
  // const globalTheme = globalContext?.theme;
  const globalColorMode = globalContext?.colorMode;
  const globalResolvedTheme = globalContext?.resolvedTheme;

  // Initialize theme and color mode
  const [theme, setThemeState] = React.useState<string>(() =>
    isRoot ? getTheme('theme', defaultTheme) : getTheme('theme-pc', 'inherit'),
  );
  const [colorMode, setColorModeState] = React.useState<string>(() =>
    isRoot ? getTheme('color-mode', defaultColorMode) : getTheme('color-mode-pc', 'inherit'),
  );
  const [systemColorMode, setSystemColorMode] = React.useState<string>(getSystemColorMode);

  // Compute resolved color mode and theme
  const resolvedColorMode = colorMode === 'system' ? systemColorMode : colorMode;
  const resolvedTheme = (isRoot
    ? `${theme}-${resolvedColorMode}`
    : theme === 'inherit'
      ? globalResolvedTheme
      : `${theme}-${colorMode === 'inherit' ? globalColorMode === 'system' ? systemColorMode : globalColorMode : resolvedColorMode}`) ?? 'default';

  const applyTheme = React.useCallback(() => {
    if (isServer) {
      return;
    }
    const attr = isRoot ? 'data-global-theme' : 'data-pc-theme';
    document.documentElement.setAttribute(attr, resolvedTheme);
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
      setSystemColorMode(e.matches ? 'dark' : 'light');
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [enableSystem]);

  const setTheme = React.useCallback((newTheme: string) => {
    setThemeState(newTheme);
    saveToLS(isRoot ? 'theme' : 'theme-pc', newTheme);
  }, [isRoot]);

  const setColorMode = React.useCallback((newColorMode: string) => {
    setColorModeState(newColorMode);
    saveToLS(isRoot ? 'color-mode' : 'color-mode-pc', newColorMode);
  }, [isRoot]);

  const providerValue = React.useMemo((): UseThemeProps => ({
    theme,
    colorMode,
    setTheme,
    setColorMode,
    resolvedTheme: resolvedTheme ?? 'default',
    systemColorMode,
  }), [theme, colorMode, setTheme, setColorMode, resolvedTheme, systemColorMode]);

  return (
    <ThemeContext value={providerValue}>
      {isRoot ? children : <div data-theme-pc="true">{children}</div>}
    </ThemeContext>
  );
};

const getTheme = (key: string, fallback: string): string => {
  if (isServer) {
    return fallback;
  }
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const getSystemColorMode = (): string => {
  if (isServer) {
    return 'light';
  }
  return window.matchMedia(MEDIA).matches ? 'dark' : 'light';
};
