import { Locator, Page } from '@playwright/test';
import { CartPage } from './CartPage';

export class ProductsPage {
    private readonly page: Page;
    private readonly menCategory: Locator;
    private readonly jeansProduct: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.menCategory = page.locator('a[href="#Men"]');

        this.jeansProduct = page
            .locator('#Men')
            .getByRole('link', { name: 'Jeans', exact: true });

        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });

        this.cartLink = page.getByRole('link', { name: ' Cart' });
    }

    async selectMenJeans(): Promise<void> {
        await this.menCategory.click();
        await this.jeansProduct.click();
    }

    private getProduct(productName: string): Locator {
        return this.page.locator('.productinfo').filter({
            has: this.page.getByText(productName, { exact: true })
        });
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = this.getProduct(productName);
        const addToCartButton = product.locator('a.add-to-cart');

        await addToCartButton.click();
    }

    async continueShopping(): Promise<void> {
        await this.continueShoppingButton.click();
    }

    async addProductsToCart(productNames: string[]): Promise<void> {
        for (const productName of productNames) {
            await this.addProductToCart(productName);
            await this.continueShopping();
        }
    }

    async openCart(): Promise<CartPage> {
        await this.cartLink.click();

        return new CartPage(this.page);
    }
}