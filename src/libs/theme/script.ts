export const getInitialThemeScript = () => `
  (function() {
    const defaultTheme = 'default';
    const defaultColorMode = 'system';
    try {
      // Global
      const theme = localStorage.getItem('theme') || defaultTheme;
      const colorMode = localStorage.getItem('color-mode') || defaultColorMode;
      const systemColorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      const resolvedColorMode = colorMode === 'system' ? systemColorMode : colorMode;
      const globalResolvedTheme = \`\${theme}-\${resolvedColorMode}\`;
      document.documentElement.setAttribute('data-global-theme', globalResolvedTheme);

      // PC
      const themePc = localStorage.getItem('theme-pc') || 'inherit';
      const colorModePc = localStorage.getItem('color-mode-pc') || 'inherit';
      const pcTheme = themePc === 'inherit' ? theme : themePc;
      const pcColorMode = colorModePc === 'inherit' ? colorMode : colorModePc;
      const pcResolvedColorMode = pcColorMode === 'system' ? systemColorMode : pcColorMode;
      const pcResolvedTheme = themePc === 'inherit' ? globalResolvedTheme : \`\${pcTheme}-\${pcResolvedColorMode}\`;
      document.documentElement.setAttribute('data-pc-theme', pcResolvedTheme);
    } catch (e) {
      console.error(e);
    }
  })();
`;
