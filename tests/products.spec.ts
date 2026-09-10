import { test } from '../fixtures/testFixtures';
import { products } from '../test-data/products';

test('Search for a product', async ({ homePage }) => {

    await homePage.openHomePage();

    const productsPage = await homePage.navigateToProductsPage();

    await productsPage.searchProduct(products.blueTop);

    await productsPage.verifySearchResults(products.blueTop, 1);
});

test('View product details', async ({ homePage }) => {

    await homePage.openHomePage();

    const productsPage = await homePage.navigateToProductsPage();

    await productsPage.searchProduct(products.blueTop);

    const productDetailsPage = await productsPage.openProductDetails();

    await productDetailsPage.verifyProductDetails(products.blueTop);
});

test('Search for a non-existing product', async ({ homePage }) => {

    await homePage.openHomePage();

    const productsPage = await homePage.navigateToProductsPage();

    await productsPage.searchProduct('DefinitelyNotExistingProduct12345');    

    await productsPage.verifyNoSearchResults();
});

test('Search with empty input', async ({ homePage }) => {

    await homePage.openHomePage();

    const productsPage = await homePage.navigateToProductsPage();

    const initialProductCount = await productsPage.getProductCount();

    await productsPage.searchProduct('');

    await productsPage.verifyEmptySearchResults(initialProductCount);
});