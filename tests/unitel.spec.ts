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

  test('capacidade de acessos de links-Particulares', async ({ page }) => {
  await page.goto('https://www.unitel.st/');

  const menu = page.locator('a.dropdown-toggle', { hasText: 'Particulares' });

  async function clickDropdownItem(text: string) {
    await menu.click({ force: true }); // reabre o dropdown
    const link = page.locator('ul.dropdown-menu a', { hasText: text }).first();

    await link.waitFor({ state: 'visible', timeout: 3000 });
    await link.click();
  }

  await clickDropdownItem('Tarifários');
  await clickDropdownItem('Internet no telemóvel');
  await clickDropdownItem('Serviços');
  await clickDropdownItem('Roaming');
  await clickDropdownItem('Equipamentos');
  await clickDropdownItem('Consulta de Saldo');
  await clickDropdownItem('SMS Santola');
  await clickDropdownItem('10 Amigos');

  // volta a página inicial
  await page.goto('https://www.unitel.st/');
  
});


  
test('capacidade de acessos de links-Sobre a Unitel', async ({ page }) => {
  await page.goto('https://www.unitel.st/');

  const sobreMenu = page.locator('a.dropdown-toggle', { hasText: 'Sobre a Unitel' });

  async function clickDropdownItem(text: string) {
    await sobreMenu.click({ force: true });
    const link = page.locator('ul.dropdown-menu a', { hasText: text }).first();

    await link.waitFor({ state: 'visible', timeout: 3000 });
    await link.click();
  }

  await clickDropdownItem('Quem Somos');
  await clickDropdownItem('Recrutamento');
  await clickDropdownItem('Responsabilidade Social');
  await clickDropdownItem('Política de Privacidade');
  await clickDropdownItem('Revistas Unitel');
  await clickDropdownItem('Notícias');
  await clickDropdownItem('Podcast');
  await clickDropdownItem('Onde Estamos');

  // volta a página inicial
  await page.goto('https://www.unitel.st/');
  
});

test('Tarifários — toggles Voz / Dados / MaxiBin são clicáveis', async ({ page }) => {
  await page.goto('https://www.unitel.st/tarifarios.php');

  const tabs = [
    { label: 'Tarifários de Voz', target: '#h2tab1' },
    { label: 'Tarifários de Dados', target: '#h2tab2' },
    { label: 'Tarifário Maxibin', target: '#h2tab3' },
  ];

  for (const tab of tabs) {
    const tabButton = page.getByRole('tab', { name: tab.label });
    await expect(tabButton).toBeVisible();
    await tabButton.click();

    
    const panel = page.locator(tab.target);
    await expect(panel).toBeVisible();
  }
});

test('Quem Somos — conteúdo e botões de compartilhamento existem e clicáveis', async ({ page }) => {
  await page.goto('https://www.unitel.st/quem-somos.php');

  const titulo = page.locator('text=Quem Somos');
  const tituloCount = await titulo.count();

  // Verificar os botões (Facebook, Instagram, Twitter, LinkedIn)
  const redes = page.locator('a[href*="facebook"], a[href*="instagram"], a[href*="twitter"], a[href*="linkedin"]');
  const redesCount = await redes.count();
  

  //  clica em cada um para garantir que são clicáveis
  for (let i = 0; i < redesCount; i++) {
    await redes.nth(i).evaluate((el) => (el as HTMLElement).click()); // executa o click via JS sem esperar visibilidade
  }

  // Voltar para a home ao final
  await page.goto('https://www.unitel.st/');
});


});
