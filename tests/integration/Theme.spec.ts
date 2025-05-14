import { expect, test } from '@playwright/test';

test.describe('Theme Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-global-theme') !== null,
      {},
      { timeout: 15000 },
    );
  });

  test('should default to "default" theme with system color mode when localStorage is empty', async ({ page }) => {
    const systemColorMode = await page.evaluate(() =>
      window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    );
    const globalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));
    const pcTheme = await page.evaluate(() => document.documentElement.getAttribute('data-pc-theme'));

    expect(globalTheme).toBe(`default-${systemColorMode}`);
    expect(pcTheme).toBe(`default-${systemColorMode}`);
  });

  test('should set global and PC themes to selected global theme and color mode when no PC theme is selected', async ({ page }) => {
    await page.locator('[data-testid="global-theme-select-trigger"]').click();
    await page.locator('[data-testid="global-theme-blue"]').click();
    await page.locator('[data-testid="global-color-mode-select-trigger"]').click();
    await page.locator('[data-testid="global-color-mode-light"]').click();

    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-global-theme') === 'blue-light',
      {},
      { timeout: 15000 },
    );
    const globalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));
    const pcTheme = await page.evaluate(() => document.documentElement.getAttribute('data-pc-theme'));

    expect(globalTheme).toBe('blue-light');
    expect(pcTheme).toBe('blue-light');
  });

  test('should show correct theme on page reload', async ({ page }) => {
    await page.locator('[data-testid="global-theme-select-trigger"]').click();
    await page.locator('[data-testid="global-theme-blue"]').click();
    await page.locator('[data-testid="global-color-mode-select-trigger"]').click();
    await page.locator('[data-testid="global-color-mode-light"]').click();

    await page.reload();
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-global-theme') === 'blue-light',
      {},
      { timeout: 15000 },
    );
    const globalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));
    const pcTheme = await page.evaluate(() => document.documentElement.getAttribute('data-pc-theme'));

    expect(globalTheme).toBe('blue-light');
    expect(pcTheme).toBe('blue-light');
  });

  test('should update all unselected themes when system mode changes with "system" color mode', async ({ page }) => {
    // Set theme to 'retro' and color mode to 'system'
    await page.locator('[data-testid="global-theme-select-trigger"]').click();
    await page.locator('[data-testid="global-theme-retro"]').click();
    await page.locator('[data-testid="global-color-mode-select-trigger"]').click();
    await page.locator('[data-testid="global-color-mode-system"]').click();

    // Reload to ensure settings are applied
    await page.reload();
    const initialGlobalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));
    const isDark = await page.evaluate(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

    expect(initialGlobalTheme).toBe(`retro-${isDark ? 'dark' : 'light'}`);

    // Simulate system color mode change
    await page.evaluate(() => {
      const media = window.matchMedia('(prefers-color-scheme: dark)');
      const newMatches = !media.matches;
      const event = new MediaQueryListEvent('change', { matches: newMatches });
      console.warn('Dispatching change event with matches:', newMatches); // Debug log
      media.dispatchEvent(event);
    });

    // Wait for the theme to update to the opposite mode
    const expectedTheme = `retro-${isDark ? 'light' : 'dark'}`;
    await page.waitForFunction(
      expected => document.documentElement.getAttribute('data-global-theme') === expected,
      expectedTheme,
      { timeout: 30000 },
    );

    const updatedGlobalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));
    const updatedPcTheme = await page.evaluate(() => document.documentElement.getAttribute('data-pc-theme'));

    console.warn('Updated global theme:', updatedGlobalTheme); // Debug log
    console.warn('Updated PC theme:', updatedPcTheme); // Debug log

    expect(updatedGlobalTheme).toBe(expectedTheme);
    expect(updatedPcTheme).toBe(expectedTheme);
  });
});
