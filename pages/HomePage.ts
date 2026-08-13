import { Locator, Page } from '@playwright/test';
import { ProductsPage } from './ProductsPage';

export class HomePage {
    private readonly page: Page;
    private readonly productsButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.productsButton = page.getByRole('link', { name: 'Products' });
    }

    async openHomePage(): Promise<void> {
        await this.page.goto('/');
    }

    async navigateToProductsPage(): Promise<ProductsPage> {
        await this.productsButton.click();

        return new ProductsPage(this.page);
    }
}