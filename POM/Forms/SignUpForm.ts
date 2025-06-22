import { expect, Locator } from "@playwright/test";
import BasePage from "../Pages/BasePage";

export default class SignInForm extends BasePage {
    private readonly form: Locator = this.page.locator('//div[@class="modal-content"]');
    private readonly closeButton: Locator = this.page.getByRole('button', { name: 'Close' });
    private readonly formTitle: Locator = this.page.getByRole('heading', { name: 'Registration' });
    private readonly nameInput: Locator = this.page.locator('#signupName');
    private readonly lastNameInput: Locator = this.page.locator('#signupLastName');
    private readonly emailInput: Locator = this.page.locator('#signupEmail');
    private readonly passwordInput: Locator = this.page.locator('#signupPassword');
    private readonly confirmPasswordInput: Locator = this.page.locator('#signupRepeatPassword');
    private readonly signUpButton: Locator = this.page.locator('//app-signup-modal//button[@class="btn btn-primary"]');
    private readonly errorMessage: Locator = this.page.locator('.invalid-feedback');
    async closeForm(): Promise<void> {
        await this.closeButton.click();
    }

    async verifyFormIsOpened(): Promise<void> {
        await this.form.waitFor({ state: 'visible' });
        await this.formTitle.isVisible();
        await this.nameInput.isVisible();
        await this.lastNameInput.isVisible();
        await this.emailInput.isVisible();
        await this.passwordInput.isVisible();
        await this.confirmPasswordInput.isVisible();
        await this.signUpButton.isVisible();
    }

    async enterName(firstName: string): Promise<void> {
        await this.nameInput.fill(firstName);
    }

    async enterLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async enterEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async enterConfirmPassword(confirmPassword: string): Promise<void> {
        await this.confirmPasswordInput.fill(confirmPassword);
    }

    async clickSignUpButton(): Promise<void> {
        await this.signUpButton.click();
    }

    async fillSignUpForm( firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Promise<void> {
        await this.enterName(firstName);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterConfirmPassword(confirmPassword);
        await this.clickSignUpButton();
    }

    async triggerEmptyErrorOnField(fieldName: string): Promise<void> {
        const fieldMap: { [key: string]: Locator } = {
            name: this.nameInput,
            lastName: this.lastNameInput,
            email: this.emailInput,
            password: this.passwordInput,
            confirmPassword: this.confirmPasswordInput
        };

        const element = fieldMap[fieldName];

        if (!element) {
            throw new Error(`No field found for name: ${fieldName}`);
        }

        await element.focus();
        await element.blur();
    }
}