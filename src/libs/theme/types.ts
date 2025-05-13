export type Attribute = string | 'class';

export type UseThemeProps = {
  theme: string | undefined;
  setTheme: React.Dispatch<React.SetStateAction<string | undefined>>;
  resolvedTheme: string | undefined;
  themes: string[];
  systemTheme?: string | undefined;
};

export type ThemeProviderProps = {
  forcedTheme?: string;
  storageKey?: string;
  themes?: string[];
  defaultTheme?: string;
  attribute?: Attribute | Attribute[];
  enableSystem?: boolean;
  children: React.ReactNode;
};
