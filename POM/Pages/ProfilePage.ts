import { expect, Locator } from '@playwright/test'
import BasePage from './BasePage'

export default class ProfilePage extends BasePage {
    private readonly profilePageTitle: Locator = this.page.getByRole('heading', { name: 'Profile' });
    private readonly profileName: Locator = this.page.locator('//p[contains(@class, "profile_name") and contains(@class, "display-4")]');

    async visitProfilePage(): Promise<void> {
        await this.page.goto('panel/profile');
        await this.verifyProfilePageIsOpened();
    }

    async verifyProfilePageIsOpened(): Promise<void> {
        await this.page.waitForURL('panel/profile');
        await this.profilePageTitle.isVisible();
        await this.profileName.isVisible();
    
    }

    async verifyProfileName(expectedName: string): Promise<void> {
        await expect(this.profileName).toHaveText(expectedName);
    }
}
