import { Page } from '@playwright/test';
export async function blockAds(page: Page): Promise<void> {
    await page.route('**/*', async route => {
        const url = route.request().url();

        if (
            url.includes('pagead2.googlesyndication.com') ||
            url.includes('googleads.g.doubleclick.net') ||
            url.includes('tpc.googlesyndication.com') ||
            url.includes('adtrafficquality.google')
        ) {
            await route.abort();
        } else {
            await route.continue();
        }
    });
}