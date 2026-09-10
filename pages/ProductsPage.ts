import { expect, Locator, Page } from '@playwright/test';
import { CartPage } from './CartPage';
import { ProductDetailsPage } from './ProductDetailsPage';

export class ProductsPage {
    private readonly page: Page;
    private readonly menCategory: Locator;
    private readonly jeansProduct: Locator;
    private readonly continueShoppingButton: Locator;
    private readonly cartLink: Locator;
    private readonly searchInput: Locator;
    private readonly searchButton: Locator;
    private readonly searchedProductsTitle: Locator;
    private readonly productItems: Locator;
    private readonly viewProductLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.menCategory = page.locator('a[href="#Men"]');

        this.jeansProduct = page
            .locator('#Men')
            .getByRole('link', { name: 'Jeans', exact: true });

        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        this.cartLink = page.getByRole('link', { name: ' Cart' });

        this.searchInput = page.locator('#search_product');

        this.searchButton = page.locator('#submit_search');
        this.searchedProductsTitle = page.getByText('Searched Products', { exact: true });

        this.productItems = page.locator('.productinfo');
        this.viewProductLink = page.getByRole('link', { name: 'View Product' });
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

    async openProductDetails(): Promise<ProductDetailsPage> {
        await this.viewProductLink.click();
        return new ProductDetailsPage(this.page);
    }

    async searchProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }

    async verifySearchResults(productName: string, expectedCount: number): Promise<void> {
        await expect(this.searchedProductsTitle).toBeVisible({ timeout: 10000 });
        await expect(this.productItems).toHaveCount(expectedCount);
        await expect(this.getProduct(productName)).toBeVisible();
    }

    async verifyNoSearchResults(): Promise<void> {
        await expect(this.searchedProductsTitle).toBeVisible();
        await expect(this.productItems).toHaveCount(0);
    }

    async verifyEmptySearchResults(initialProductCount: number): Promise<void> {
        await expect(this.page).toHaveURL(/\/products\?search=$/);
        await expect(this.productItems).toHaveCount(initialProductCount);
    }
}