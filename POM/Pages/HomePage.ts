import { Locator } from '@playwright/test'
import BasePage from './BasePage'

export default class HomePage extends BasePage {
    private readonly signInButton: Locator = this.page.getByRole('button', { name: 'Sign In' });
    private readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });

    async open(): Promise<any> {
        await this.page.goto('');
    }

    async clickSignInButton(): Promise<any> {
        await this.signInButton.click();
    }

    async clickSignUpButton(): Promise<any> {
        await this.signUpButton.click();
    }
}