import { test as base } from '@playwright/test';
import GaragePage from '../Pages/GaragePage';
import SignInForm from '../Forms/SignInForm';
import HomePage from '../Pages/HomePage';
import EditCarForm from '../Forms/EditCarForm';

type MyFixtures = {
  garagePage: GaragePage;
};

base.use({ storageState: 'test-data/states/mainUserState.json' });

export const test = base.extend<MyFixtures>({
  garagePage: async ({ page }, use) => {


      const homePage = new HomePage(page);
      const signInForm = new SignInForm(page);
      const garagePage = new GaragePage(page);
      const editCarForm = new EditCarForm(page);


      // await homePage.open();
      // await homePage.clickSignInButton();
      // await signInForm.loginWithCredentials(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
      await garagePage.visitGaragePage();
      await garagePage.verifyGaragePageIsOpened();
      
      await use(garagePage);

      // Remove added car
      
      await garagePage.clickEditCarButton(); // Implement this method in GaragePage
      await editCarForm.removeCar();
  }
});




export { expect } from '@playwright/test';
