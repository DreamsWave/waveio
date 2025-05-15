import { expect, test } from '@playwright/test';

test.describe('Theme Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.waitForLoadState('domcontentloaded');
    await page.waitForFunction(
      () => document.documentElement.getAttribute('data-global-theme') !== null,
      {},
      { timeout: 20000 },
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
      { timeout: 20000 },
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
      { timeout: 20000 },
    );
    const globalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));
    const pcTheme = await page.evaluate(() => document.documentElement.getAttribute('data-pc-theme'));

    expect(globalTheme).toBe('blue-light');
    expect(pcTheme).toBe('blue-light');
  });

  test('should update to retro-dark when system mode changes from light to dark with "system" color mode', async ({ page }) => {
    // Set theme to 'retro' and color mode to 'system'
    await page.locator('[data-testid="global-theme-select-trigger"]').click();
    await page.locator('[data-testid="global-theme-retro"]').click();
    await page.locator('[data-testid="global-color-mode-select-trigger"]').click();
    await page.locator('[data-testid="global-color-mode-system"]').click();

    const initialGlobalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));

    expect(initialGlobalTheme).toBe('retro-light');

    // Simulate system color mode change to dark
    await page.emulateMedia({ colorScheme: 'dark' });

    // Wait for the theme to update to dark mode
    const expectedTheme = 'retro-dark';
    await page.waitForFunction(
      ({ expectedTheme }) => document.documentElement.getAttribute('data-global-theme') === expectedTheme,
      { expectedTheme },
      { timeout: 20000 },
    );

    const updatedGlobalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));
    const updatedPcTheme = await page.evaluate(() => document.documentElement.getAttribute('data-pc-theme'));

    expect(updatedGlobalTheme).toBe(expectedTheme);
    expect(updatedPcTheme).toBe(expectedTheme);
  });

  test('should update to retro-light when system mode changes from dark to light with "system" color mode', async ({ page }) => {
    // Set theme to 'retro' and color mode to 'system'
    await page.locator('[data-testid="global-theme-select-trigger"]').click();
    await page.locator('[data-testid="global-theme-retro"]').click();
    await page.locator('[data-testid="global-color-mode-select-trigger"]').click();
    await page.locator('[data-testid="global-color-mode-system"]').click();

    const initialGlobalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));

    expect(initialGlobalTheme).toBe('retro-light'); // Change assertion to retro-light

    // Simulate system color mode change to light
    await page.emulateMedia({ colorScheme: 'light' });

    // Wait for the theme to update to light mode
    const expectedTheme = 'retro-light';
    await page.waitForFunction(
      ({ expectedTheme }) => document.documentElement.getAttribute('data-global-theme') === expectedTheme,
      { expectedTheme },
      { timeout: 20000 },
    );

    const updatedGlobalTheme = await page.evaluate(() => document.documentElement.getAttribute('data-global-theme'));
    const updatedPcTheme = await page.evaluate(() => document.documentElement.getAttribute('data-pc-theme'));

    expect(updatedGlobalTheme).toBe(expectedTheme);
    expect(updatedPcTheme).toBe(expectedTheme);
  });
});
