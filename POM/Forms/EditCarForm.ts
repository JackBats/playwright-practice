import { Locator } from "@playwright/test";
import BasePage from "../Pages/BasePage";

export default class EditCarForm extends BasePage {
    private readonly removeCarButton: Locator = this.page.locator('//button[@class="btn btn-outline-danger"]');
    private readonly confirmRemoveButton: Locator = this.page.locator('//button[@class="btn btn-danger"]');

    async clickRemoveCarButton(): Promise<void> {
        await this.removeCarButton.click();
    }

    async clickConfirmRemoveButton(): Promise<void> {
        await this.confirmRemoveButton.click();
    }
    async removeCar(): Promise<void> {
        await this.clickRemoveCarButton();
        await this.clickConfirmRemoveButton();
    }
};


