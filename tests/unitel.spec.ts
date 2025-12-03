import { test, expect, Page } from '@playwright/test';

test.describe('Unitel Navigation Bar', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.unitel.st/');
    await expect(page).toHaveTitle("Bem-vindo | Unitel STP");
  });

  // Home
  test('Home', async ({ page }) => {
    const link = page.locator('text=Home');
    await link.click();
    await expect(page).toHaveURL(/index\.php$/);
  });

  // Empresas 
  test('Empresas', async ({ page }) => {
    const link = page.locator('text=Empresas');
    await expect(link).toBeVisible();
    await link.click();

  });

  // Área do Cliente 
  test('Área de Cliente', async ({ page }) => {
    const menu = page.locator('a.dropdown-toggle', { hasText: 'Área de Cliente' });
  await menu.click(); // abre o dropdown

  // Link Apoio a Clientes
  const apoio = page.locator('text=Apoio a Clientes');
  await apoio.click();
  await expect(page).toHaveURL(/apoio-cliente\.php$/);

  // Link Contacte-nos
  await menu.click(); // abre novamente o dropdown
  const contacte = page.locator('text=Contacte-nos');
  await contacte.click();
  await expect(page).toHaveURL(/contactos\.php$/); 
});

  test('Dropdown Particulares', async ({ page }) => {
  await page.goto('https://www.unitel.st/');

  const menu = page.locator('a.dropdown-toggle', { hasText: 'Particulares' });

  // Função para clicar em um item do dropdown pelo texto exato
  async function clickDropdownItem(text: string, urlPattern: RegExp) {
    await menu.click({ force: true }); // abre o dropdown
    const link = page.locator('ul.dropdown-menu a', { hasText: text }).first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 5000 }).catch(() => {}),
      link.click(),
    ]);

  }

  await clickDropdownItem('Tarifários', /tarifarios\.php$/);
  await clickDropdownItem('Internet no telemóvel', /internet-telemovel\.php$/);
  await clickDropdownItem('Serviços', /servicos\.php$/);
  await clickDropdownItem('Roaming', /roaming\.php$/);
  await clickDropdownItem('Equipamentos', /equipamentos\.php$/);
  await clickDropdownItem('Consulta de Saldo', /consulta-saldo\.php$/);
  await clickDropdownItem('SMS Santola', /sms-santola\.php$/);
  await clickDropdownItem('10 Amigos', /10-amigos\.php$/);
});

  
test('Dropdown Sobre a Unitel', async ({ page }) => {
  await page.goto('https://www.unitel.st/');

  const sobreMenu = page.locator('a.dropdown-toggle', { hasText: 'Sobre a Unitel' });
  async function clickDropdownItem(text: string, urlPattern: RegExp) {
    await sobreMenu.click({ force: true }); 
    const link = page.locator('ul.dropdown-menu a', { hasText: text }).first();
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'load', timeout: 5000 }).catch(() => {}),
      link.click(),
    ]);
  }

  await clickDropdownItem('Quem Somos', /quem-somos\.php$/);
  await clickDropdownItem('Recrutamento', /recrutamento\.php$/);
  await clickDropdownItem('Responsabilidade Social', /responsabilidade-social\.php$/);
  await clickDropdownItem('Política de Privacidade', /politica-privacidade\.php$/);
  await clickDropdownItem('Revistas Unitel', /revistas-unitel\.php$/);
  await clickDropdownItem('Notícias', /noticias\.php$/);
  await clickDropdownItem('Podcast', /podcast\.php$/);
  await clickDropdownItem('Onde Estamos', /onde-estamos\.php$/);
});



});
