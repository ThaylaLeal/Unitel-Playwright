import { test, expect} from '@playwright/test';
import { ContactPage } from '../pages/ContactPage';


test.describe('Unitel Contact form', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.unitel.st/');
    await expect(page).toHaveTitle("Bem-vindo | Unitel STP");
  });

  // Área do Cliente 
  test('Área de Cliente', async ({ page }) => {
    const contact = new ContactPage(page);
    const menu = page.locator('a.dropdown-toggle', { hasText: 'Área de Cliente' });
    await menu.hover(); // abre o dropdown
    // Link Contacte-nos
    const contacte = page.locator('text=Contacte-nos');
    await contacte.click();
    await expect(page).toHaveURL(/contactos\.php$/); 

    // preencher campos por id com texto dummy
    await contact.nameInput.fill('Test Teste');
    await contact.emailInput.fill('test.teste@example.com');
    await contact.subjectInput.fill('Assunto de teste');
    await contact.messageInput.fill('Isto é um teste automático');

    // validar os valores preenchidos
    await expect(contact.nameInput).toHaveValue('Test Teste');
    await expect(contact.emailInput).toHaveValue('test.teste@example.com');
    await expect(contact.subjectInput).toHaveValue('Assunto de teste');
    await expect(contact.messageInput).toHaveValue('Isto é um teste automático');

    await expect(contact.submitButton).toBeVisible();
    await expect(contact.submitButton).toBeEnabled();
    await contact.submitButton.click();

    await expect(contact.successMessage).toBeVisible();
    await expect(contact.successMessage).toHaveText('Recebemos a sua mensagem, entraremos em contato em breve.');
  });

});