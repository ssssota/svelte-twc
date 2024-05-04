import { expect, test } from '@playwright/test';

test('render images with each plugins', async ({ page }) => {
	await page.goto('/');

	expect(await page.innerHTML('html')).toMatchSnapshot();
	await expect(page).toHaveScreenshot({ fullPage: true });
});
