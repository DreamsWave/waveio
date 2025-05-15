export type Attribute = string | 'class';

export type ThemeName = 'default' | 'blue' | 'retro' | 'green' | 'purple' | 'inherit';
export type ColorMode = 'light' | 'dark' | 'system' | 'inherit';

export type UseThemeProps = {
  theme: ThemeName | undefined;
  colorMode: ColorMode | undefined;
  setTheme: (theme: ThemeName) => void;
  setColorMode: (colorMode: ColorMode) => void;
  resolvedTheme: string;
  systemColorMode: 'light' | 'dark';
};

export type ThemeProviderProps = {
  storageKey?: string;
  themes?: string[];
  defaultTheme?: string;
  defaultColorMode?: string;
  enableSystem?: boolean;
  children: React.ReactNode;
};
