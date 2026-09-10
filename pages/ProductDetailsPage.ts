import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
    private readonly productName: Locator;
    private readonly productPrice: Locator;
    private readonly availability: Locator;

    constructor(page: Page) {
        this.productName = page.locator('.product-information h2');

        this.productPrice = page.locator('.product-information > span > span');

        this.availability = page.locator('.product-information p').filter({
            hasText: 'Availability:'
        });
    }

    async verifyProductDetails(expectedName: string): Promise<void> {
        await expect(this.productName).toHaveText(expectedName);
        await expect(this.productPrice).toBeVisible();
        await expect(this.availability).toBeVisible();
    }
}