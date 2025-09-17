import { Page } from 'playwright';
export default class LoginPage {
  readonly page: Page;
  readonly usernameInput: string;
  readonly passwordInput: string;
  readonly loginButton: string;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = 'input[id="username"]';
    this.passwordInput = 'input[id="password"]';
    this.loginButton = 'button[id="submit"]';
  }

  // Method to login
  async login(username: string, password: string) {
    await this.page.fill(this.usernameInput, username);
    await this.page.waitForTimeout(200);

    await this.page.fill(this.passwordInput, password);
    await this.page.waitForTimeout(200);

    await this.page.click(this.loginButton);
    await this.page.waitForTimeout(2000);
  }
}