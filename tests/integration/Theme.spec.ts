import { expect, test } from '@playwright/test';

test.describe('Theme Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-theme') !== null,
      {},
      { timeout: 15000 },
    );
  });

  test('should default to system preferred mode when localStorage is empty', async ({ page }) => {
    const systemMode = await page.evaluate(() =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    );
    const globalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    expect(globalTheme).toBe(systemMode);
  });

  test('should set global and PC themes to selected global theme when no PC theme is selected', async ({ page }) => {
    await page
      .locator('[data-testid="global-themes"] button[data-testid="global-theme-blue-light"]')
      .click();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-theme') === 'blue-light',
      {},
      { timeout: 15000 },
    );
    const globalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const pcTheme = await page.evaluate(() =>
      document.querySelector('div[data-theme-pc="true"]')?.getAttribute('data-theme'),
    );

    expect(globalTheme).toBe('blue-light');
    expect(pcTheme).toBe('blue-light');
  });

  test('should show correct theme on page reload', async ({ page }) => {
    await page
      .locator('[data-testid="global-themes"] button[data-testid="global-theme-blue-light"]')
      .click();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-theme') === 'blue-light',
      {},
      { timeout: 15000 },
    );
    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-theme') !== null,
      {},
      { timeout: 15000 },
    );
    const globalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    expect(globalTheme).toBe('blue-light');
  });

  test('should update all unselected themes when system mode changes and localStorage is empty', async ({ page }) => {
    // Ensure theme is 'system'
    await page.evaluate(() => localStorage.setItem('theme', 'system'));
    await page.reload(); // Reload to apply the theme
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-theme') !== null,
      {},
      { timeout: 15000 },
    );

    const initialTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    const isDark = await page.evaluate(() =>
      window.matchMedia('(prefers-color-scheme: dark)').matches,
    );

    expect(initialTheme).toBe(isDark ? 'dark' : 'light');

    const themeState = await page.evaluate(() => {
      const themeContext = (window as any).__REACT_CONTEXTS__.ThemeContext;
      return themeContext?.theme;
    });
    console.warn('Theme state before matchMedia:', themeState);

    await page.evaluate(() => {
      console.warn('Starting matchMedia mock');
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const newMatches = !media.matches;
      const event = new Event('change') as MediaQueryListEvent;
      Object.defineProperty(event, 'matches', { value: newMatches });
      Object.defineProperty(event, 'media', { value: '(prefers-color-scheme: dark)' });
      console.warn('Dispatching change event:', { matches: newMatches });
      media.dispatchEvent(event);
    });

    await page.waitForFunction(
      (initialTheme) => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        console.warn('Checking theme change:', { initialTheme, currentTheme });
        return currentTheme !== initialTheme;
      },
      initialTheme,
      { timeout: 30000 },
    );
    const updatedTheme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    expect(updatedTheme).not.toBe(initialTheme);
    expect(updatedTheme).toBe(isDark ? 'light' : 'dark');
  });
});
