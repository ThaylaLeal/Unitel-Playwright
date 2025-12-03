import { test, expect, Page } from '@playwright/test';

test.describe('Unitel Navigation Bar', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.unitel.st/');
    await expect(page).toHaveTitle("Bem-vindo | Unitel STP");
  });

  // Links diretos
  test('Home', async ({ page }) => {
    const link = page.locator('text=Home');
    await link.click();
    await expect(page).toHaveURL(/index\.php$/);
  });

  test('Empresas', async ({ page }) => {
    const link = page.locator('text=Empresas');
    await link.click();
  });

  // Dropdowns
  async function testDropdown(page: Page, itemText: string) {
    const item = page.locator(`.navbar-nav > li >> text=${itemText}`);
    await item.hover();
    const links = item.locator('a.dropdown-item');
    const count = await links.count();

    for (let i = 0; i < count; i++) {
      await item.hover(); // garante que o dropdown está aberto
      const link = links.nth(i);
      await Promise.all([
        page.waitForNavigation({ waitUntil: 'load' }),
        link.click(),
      ]);
      console.log(`${itemText} -> abriu: ${page.url()}`);
      await page.goto('https://www.unitel.st/');
    }
  }

  test('Particulares dropdown', async ({ page }) => {
    await testDropdown(page, 'Particulares');
  });

  test('Sobre a Unitel dropdown', async ({ page }) => {
    await testDropdown(page, 'Sobre a Unitel');
  });

  test('Área do Cliente dropdown', async ({ page }) => {
    await testDropdown(page, 'Área do Cliente');
  });

});
