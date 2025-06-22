import { Locator } from '@playwright/test'
import BasePage from './BasePage'

export default class GaragePage extends BasePage {
    private readonly garageTitle: Locator = this.page.getByRole('heading', { name: 'Garage' });
    private readonly emptyGarageMessage: Locator = this.page.getByText('You don’t have any cars in');

    async verifyGaragePageIsOpened(): Promise<void> {
        await this.page.waitForURL('panel/garage');
        await this.garageTitle.isVisible();
        await this.emptyGarageMessage.isVisible();
    }

    async visitGaragePage(): Promise<void> {
        await this.page.goto('panel/garage');
        await this.verifyGaragePageIsOpened();
    }
}