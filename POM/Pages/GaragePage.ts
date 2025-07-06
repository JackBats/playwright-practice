import { expect, Locator } from '@playwright/test'
import BasePage from './BasePage'

export default class GaragePage extends BasePage {
    private readonly garageTitle: Locator = this.page.getByRole('heading', { name: 'Garage' });
    private readonly emptyGarageMessage: Locator = this.page.getByText('You don’t have any cars in');
    private readonly addNewCarButton: Locator = this.page.getByRole('button', { name: 'Add car' });
    private readonly brandDropdown: Locator = this.page.locator('//select[@id="addCarBrand"]');
    private readonly modelDropdown: Locator = this.page.locator('//select[@id="addCarModel"]');
    private readonly mileageField: Locator = this.page.locator('//input[@id="addCarMileage"]');
    private readonly submitAddingCarButton: Locator = this.page.locator('//app-add-car-modal//button[contains(@class, "btn-primary")]');
    private readonly allAddedCarNames: Locator = this.page.locator('//p[contains(@class,"car_name")]');
    private readonly editCarButton: Locator = this.page.locator('//button[contains(@class, "car_edit")]');


    async verifyGaragePageIsOpened(): Promise<void> {
        await this.page.waitForURL('panel/garage');
        await this.garageTitle.isVisible();
        await this.emptyGarageMessage.isVisible();
    }

    async visitGaragePage(): Promise<void> {
        await this.page.goto('panel/garage');
        await this.verifyGaragePageIsOpened();
    }

    async addNewCar(brand: string, model: string, mileage: string): Promise<void> {
        await this.addNewCarButton.click();
        await this.brandDropdown.selectOption(brand);
        await this.modelDropdown.selectOption(model);
        await this.mileageField.fill(mileage);
        await this.submitAddingCarButton.click();
    }

     async verifyLastAddedCarName(expectedName: string): Promise<void> {
        await expect(this.allAddedCarNames.first()).toHaveText(expectedName);
    }

    async clickEditCarButton(): Promise<void> {
        await this.editCarButton.click();
    }
}

