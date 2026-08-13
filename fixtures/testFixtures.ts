import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { blockAds } from '../utils/blockAds';

type TestFixtures = {
    homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
    homePage: async ({ page }, use) => {
        await blockAds(page);

        const homePage = new HomePage(page);

        await use(homePage);
    }
});

export { expect } from '@playwright/test';