import { expect, test } from '@playwright/test';

test('render images with each plugins', async ({ page }) => {
	await page.goto('/');

	await expect(page).toHaveScreenshot({ fullPage: true });
});
