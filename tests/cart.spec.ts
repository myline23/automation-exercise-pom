import { test } from '../fixtures/testFixtures';
import { products } from '../test-data/products';

test('Add two jeans products to cart', async ({ homePage }) => {

    await homePage.openHomePage();

    const productsPage = await homePage.navigateToProductsPage();

    await productsPage.selectMenJeans();

    await productsPage.addProductsToCart([
        products.softStretchJeans,
        products.regularFitStraightJeans
    ]);

    const cartPage = await productsPage.openCart();

    await cartPage.verifyProducts([
        products.softStretchJeans,
        products.regularFitStraightJeans
    ]);
});

test('Remove product from cart', async ({ homePage }) => {

    await homePage.openHomePage();

    const productsPage = await homePage.navigateToProductsPage();

    await productsPage.searchProduct(products.blueTop);

    await productsPage.addProductToCart(products.blueTop);

    await productsPage.continueShopping();

    const cartPage = await productsPage.openCart();

    await cartPage.verifyProductCount(products.blueTop, 1);

    await cartPage.removeProduct(products.blueTop);

    await cartPage.verifyProductCount(products.blueTop, 0);
});