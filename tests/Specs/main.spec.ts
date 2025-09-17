import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/Login';
import dotenv from 'dotenv';

dotenv.config();

test.only('login with invalid and valid credentials', async ({ page }) => {

  await test.step('Login with invalid username', async () => {
    const loginPage = new LoginPage(page);

    await page.goto('/practice-test-login');

    await loginPage.login(process.env.InvalidUsername!, process.env.password!);

    expect(await page.isVisible('Your username is invalid'));
  });

    await test.step('Login with invalid password', async () => {
      const loginPage = new LoginPage(page);
  
      await page.goto('/practice-test-login');
  
      await loginPage.login(process.env.email!, process.env.InvalidPassword!);
  
      expect(await page.isVisible('Your password is invalid'));

    });

    await test.step('Login with valid credentials and Logout', async () => {
      const loginPage = new LoginPage(page);

      await page.goto('/practice-test-login/');

      expect(await page.title()).toBe('Test Login | Practice Test Automation');

      await loginPage.login(process.env.email!, process.env.PASSWORD!);

      expect(page.url()).toContain('/logged-in-successfully');
      await page.waitForTimeout(2000);
      
      expect(await page.title()).toBe('Logged In Successfully | Practice Test Automation');

      // Check if login is successful
      expect(await page.isVisible('text=Logged In Successfully'));

      //logout from the page
      expect(await page.isVisible('text="Log out"'));

      await page.click('text="Log out"');
    });
});