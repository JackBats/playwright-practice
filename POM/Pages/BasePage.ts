import { expect, Page, Locator } from "@playwright/test";

export default class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyErrorIsDisplayed(errorText: string) {
    await expect(this.page.getByText(errorText)).toBeVisible();
  }
  async verifyErrorIsNotDisplayed(errorText: string) {
    await expect(this.page.getByText(errorText)).not.toBeVisible();
  }

  async verifyFieldHasRedBorder(field: Locator): Promise<void> {
    await this.page.waitForTimeout(200);
    const borderColor = await field.evaluate((el) => getComputedStyle(el).borderColor);
    expect(borderColor).toBe("rgb(220, 53, 69)"); // #dc3545 as rgb
  }
}
