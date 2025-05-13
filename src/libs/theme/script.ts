export const getInitialThemeScript = () => `
  (function() {
    const defaultTheme = 'system';
    try {
      // Compute global theme
      const globalKey = 'theme';
      const globalTheme = localStorage.getItem(globalKey) || defaultTheme;
      const globalResolved = globalTheme === 'system' 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : globalTheme;
      document.documentElement.setAttribute('data-theme', globalResolved);

      // Compute PC theme
      const pcKey = 'theme-pc';
      const pcTheme = localStorage.getItem(pcKey);
      const pcResolved = pcTheme 
        ? (pcTheme === 'system' 
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : pcTheme)
        : globalResolved;
      document.documentElement.setAttribute('data-theme-pc', pcResolved);
    } catch (e) {
      console.error(e);
    }
  })();
`;
