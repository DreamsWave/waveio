export type Attribute = string | 'class';

export type UseThemeProps = {
  theme: string | undefined; // e.g., 'blue'
  colorMode: string | undefined; // e.g., 'light', 'dark', 'system'
  setTheme: (theme: string) => void;
  setColorMode: (colorMode: string) => void;
  resolvedTheme: string; // e.g., 'blue-light'
  systemColorMode: string; // 'light' or 'dark'
};

export type ThemeProviderProps = {
  storageKey?: string;
  themes?: string[];
  defaultTheme?: string;
  defaultColorMode?: string;
  enableSystem?: boolean;
  children: React.ReactNode;
};
