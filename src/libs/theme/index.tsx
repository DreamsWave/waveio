'use client';

import type { ThemeProviderProps as ThemeProps, UseThemeProps } from './types';
import { APP_THEMES } from '@/utils/constants';
import * as React from 'react';

const MEDIA = '(prefers-color-scheme: dark)';
const isServer = typeof window === 'undefined';
const ThemeContext = React.createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = {
  setTheme: () => {},
  themes: [],
  theme: undefined,
  resolvedTheme: undefined,
};

const saveToLS = (storageKey: string, value: string | undefined) => {
  try {
    if (value === undefined) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, value);
    }
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
  forcedTheme,
  storageKey = 'theme',
  themes = APP_THEMES,
  defaultTheme = 'system',
  attribute = 'data-theme',
  enableSystem = true,
  children,
  isRoot,
}: ThemeProps & { isRoot: boolean }) => {
  const globalContext = React.use(ThemeContext);
  const globalTheme = globalContext?.theme;

  const [theme, setThemeState] = React.useState<string>(() => {
    const storedTheme = getTheme(storageKey, defaultTheme);
    if (!storedTheme && globalTheme && !isRoot) {
      return globalTheme;
    }
    return storedTheme || defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = React.useState<string>(() =>
    resolveTheme(theme, defaultTheme),
  );
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const applyTheme = React.useCallback(
    (themeToApply: string | undefined) => {
      if (isServer) {
        return;
      }
      const resolved = resolveTheme(themeToApply, defaultTheme);
      const element = isRoot ? document.documentElement : wrapperRef.current;
      if (element) {
        const attributes = Array.isArray(attribute) ? attribute : [attribute];
        attributes.forEach((attr) => {
          element.setAttribute(attr, resolved);
        });
      }
    },
    [attribute, isRoot, defaultTheme],
  );

  const setTheme = React.useCallback(
    (value: React.SetStateAction<string | undefined>) => {
      const newValue = typeof value === 'function' ? value(theme) : value;
      const finalValue = newValue ?? defaultTheme;
      setThemeState(finalValue);
      saveToLS(storageKey, finalValue);
      applyTheme(finalValue);
      if (storageKey === 'theme' && !localStorage.getItem('theme-pc')) {
        window.dispatchEvent(new StorageEvent('storage', { key: 'theme-pc', newValue: finalValue }));
      }
    },
    [storageKey, applyTheme, defaultTheme, theme],
  );

  // Sync PC theme with global theme when no PC theme is stored
  React.useEffect(() => {
    if (isRoot || !globalTheme) {
      return;
    }
    const storedTheme = localStorage.getItem(storageKey);
    if (!storedTheme && globalTheme !== theme) {
      setThemeState(globalTheme);
      applyTheme(globalTheme);
    }
  }, [globalTheme, isRoot, storageKey, applyTheme, theme]);

  // Listen for localStorage changes to theme-pc
  React.useEffect(() => {
    if (isRoot || storageKey !== 'theme-pc') {
      return;
    }
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme-pc' && e.newValue !== theme) {
        setThemeState(e.newValue || defaultTheme);
        applyTheme(e.newValue || defaultTheme);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [storageKey, theme, applyTheme, defaultTheme, isRoot]);

  // Handle system mode changes
  React.useEffect(() => {
    if (!enableSystem || theme !== 'system') {
      setResolvedTheme(resolveTheme(theme, defaultTheme));
      return;
    }

    const media = window.matchMedia(MEDIA);
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const newSystemTheme = 'matches' in e ? (e.matches ? 'dark' : 'light') : getSystemTheme();
      console.warn('System theme change:', { newSystemTheme, theme, enableSystem }); // Debug log
      setResolvedTheme(newSystemTheme);
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    media.addEventListener('change', handleChange);
    handleChange(media);
    return () => media.removeEventListener('change', handleChange);
  }, [theme, enableSystem, applyTheme, defaultTheme]);

  // Apply theme on mount and theme changes
  React.useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [forcedTheme, theme, applyTheme]);

  const providerValue = React.useMemo((): UseThemeProps => ({
    theme,
    setTheme,
    resolvedTheme: theme === 'system' ? resolvedTheme : theme,
    themes: enableSystem ? [...themes, 'system'] : themes,
    systemTheme: enableSystem ? resolvedTheme : undefined,
  }), [theme, setTheme, resolvedTheme, enableSystem, themes]);

  // Apply theme synchronously for client-side rendering
  if (!isServer) {
    const resolved = resolveTheme(forcedTheme ?? theme, defaultTheme);
    if (isRoot) {
      const attributes = Array.isArray(attribute) ? attribute : [attribute];
      attributes.forEach((attr) => {
        document.documentElement.setAttribute(attr, resolved);
      });
    } else if (wrapperRef.current) {
      const attributes = Array.isArray(attribute) ? attribute : [attribute];
      attributes.forEach((attr) => {
        wrapperRef.current!.setAttribute(attr, resolved);
      });
    }
  }

  return isRoot
    ? (
        <ThemeContext value={providerValue}>
          {children}
        </ThemeContext>
      )
    : (
        <div ref={wrapperRef} data-theme-pc={storageKey === 'theme-pc' ? 'true' : undefined}>
          <ThemeContext value={providerValue}>
            {children}
          </ThemeContext>
        </div>
      );
};

const getTheme = (key: string, fallback: string): string | undefined => {
  if (isServer) {
    return undefined;
  }
  try {
    return localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
};

const getSystemTheme = (): string => {
  if (isServer) {
    return 'light';
  }
  return window.matchMedia(MEDIA).matches ? 'dark' : 'light';
};

const resolveTheme = (theme: string | undefined, defaultTheme: string): string => {
  if (theme === 'system') {
    return getSystemTheme();
  }
  return theme ?? defaultTheme;
};

export type { ThemeProviderProps as ThemeProps, UseThemeProps } from './types';
