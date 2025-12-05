import { Page, Locator } from '@playwright/test';

export class ContactPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('[id="name"]');
    this.emailInput = page.locator('[id="email"]');
    this.subjectInput = page.locator('[id="subject"]');
    this.messageInput = page.locator('[id="message"]');
    this.submitButton = page.locator('input[type="submit"]');
    this.successMessage = page.locator('[id="MessageSent"]');
  }

  async gotoDirect() {
    await this.page.goto('https://www.unitel.st/contactos.php');
    await this.page.waitForLoadState('load');
  }

  async fillDummyData() {
    await this.nameInput.fill('Test Teste');
    await this.emailInput.fill('test.teste@example.com');
    await this.subjectInput.fill('Assunto de teste');
    await this.messageInput.fill('Isto é um teste automático');
  }


}