import { test, expect } from '@playwright/test';

let _productid = 1;

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

test.describe('Header', () => {
  test('should be able to search by text', async ({ page }) => {
    await page.getByPlaceholder('Search by product name or search by image').fill('laptops');
    await page.getByPlaceholder('Search by product name or search by image').press('Enter');
    await expect(page).toHaveURL('/suggested-products-list');
  });

  test('should be able to select category', async ({ page }) => {
    await page.getByRole('button', { name: 'All Categories' }).click();
    await page.getByRole('menuitem', { name: 'Laptops' }).click();
    await expect(page).toHaveURL('/list/laptops');
  });

  test('should be able to hover over header menus', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'All Products' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Laptops' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Controllers' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Mobiles' }).hover();
    await page.getByRole('navigation').getByRole('link', { name: 'Monitors' }).hover();
  });

  test('should be able to select header menu', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'All Products' }).click();
    await expect(page).toHaveURL('/list/all-products');
  });
});

test.describe('Carousel', () => {
  test('prev and next buttons change slider', async ({ page }) => {
    const carousel = page.getByTestId('carousel');
    await expect(carousel.getByText('The Fastest, Most Powerful Xbox Ever.')).toBeVisible();
    await carousel.getByRole('button', { name: 'Next' }).click();
    await expect(carousel.getByText('Xbox Wireless Controller - Mineral Camo Special Edition')).toBeVisible();
    await carousel.getByRole('button', { name: 'Previous' }).click();
  })

  test('carousel buttons change slider', async ({ page }) => {
    const carousel = page.getByTestId('carousel');
    await carousel.getByRole('button', { name: 'carousel indicator 2' }).click();
    await expect(carousel.getByText('Xbox Wireless Controller - Mineral Camo Special Edition')).toBeVisible();
    await carousel.getByRole('button', { name: 'carousel indicator 1' }).click();
    await expect(carousel.getByText('The Fastest, Most Powerful Xbox Ever.')).toBeVisible();
  })

  test('buy now button links to product page', async ({ page }) => {
    await page.getByTestId('carousel').getByRole('button', { name: 'Buy Now' }).first().click();
    await expect(page).toHaveURL('/product/detail/1');
  })

  test('more details links to list page', async ({ page }) => {
    await page.getByTestId('carousel').getByRole('button', { name: 'More Details' }).first().click();
    await expect(page).toHaveURL('/list/controllers');
  })
});

test.describe('CarouselVRT', () => {  
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');
  test('verify carousel is pixel perfect - slide 1', async ({ page }) => {
    await expect(page.getByTestId('carousel')).toHaveScreenshot();
  })

  test('verify carousel is pixel perfect - slide 2', async ({ page }) => {
    const carousel = page.getByTestId('carousel');
    await carousel.getByRole('button', { name: 'Next' }).click();
    await expect(carousel).toHaveScreenshot();
  })
});

test.describe('Product Listing', () => {
  test('should be able to select product to view details', async ({ page }) => {
    await page.goto('/list/all-products');
    await page.getByRole('img', { name: 'Xbox Wireless Controller Lunar Shift Special Edition' }).click();
    await expect(page).toHaveURL('/product/detail/' + _productid);
  });

  test('should be able to filter product by brands', async ({ page }) => {
    await page.goto('/list/all-products');
    await page.locator('[id="\\32 "]').check();
  });
});

test.describe('Product Details', () => {
  test('Image does not break UI', async ({ page }) => {
    // Navigate to the page with the image
    await page.getByRole('link', { name: 'Mobiles' }).click();
    await page.getByRole('img', { name: 'Asus Zenfone 5Z' }).click();

    // Get the dimensions of the image
    const image = page.locator('.productdetailsimage')
    const imageSize = await image.boundingBox();

    let containerSize = { height: 600 };

    // Assert that the image fits within the container
    expect(imageSize?.height).toBeLessThanOrEqual(containerSize?.height);
  });
});

test.describe('Footer', () => {
  test('should be able to select footer menu', async ({ page }) => {
    await page.getByRole('listitem').filter({ hasText: 'Monitors' }).getByRole('link', { name: 'Monitors' }).click();
    await expect(page).toHaveURL('/list/monitors');
  });
});
