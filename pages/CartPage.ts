import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;
    private readonly cartProducts: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cartProducts = page.locator('tbody tr[id^="product-"]');
    }

    private getCartProduct(productName: string): Locator {
        return this.cartProducts.filter({
            has: this.page.getByRole('link', {
                name: productName,
                exact: true
            })
        });
    }

    private getRemoveButton(productName: string): Locator {
        return this.getCartProduct(productName).locator('.cart_quantity_delete');
    }

    async removeProduct(productName: string): Promise<void> {
        await this.getRemoveButton(productName).click();
    }

    async verifyCartProductCount(expectedCount: number): Promise<void> {
        await expect(this.cartProducts).toHaveCount(expectedCount);
    }

    async verifyProductCount(productName: string, count: number): Promise<void> {
        await expect(this.getCartProduct(productName)).toHaveCount(count);
    }

    async verifyProductQuantity(
        productName: string,
        expectedQuantity: number
    ): Promise<void> {
        const product = this.getCartProduct(productName);
        const quantity = product.locator('.cart_quantity');

        await expect(quantity).toHaveText(expectedQuantity.toString());
    }

    async verifyProduct(
        productName: string,
        expectedCount: number,
        expectedQuantity: number
    ): Promise<void> {
        await this.verifyProductCount(productName, expectedCount);
        await this.verifyProductQuantity(productName, expectedQuantity);
    }

    async verifyProducts(productNames: string[]): Promise<void> {
        await this.verifyCartProductCount(productNames.length);

        for (const productName of productNames) {
            await this.verifyProduct(productName, 1, 1);
        }
    }
}