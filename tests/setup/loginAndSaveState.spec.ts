import { test, expect } from '@playwright/test';
import HomePage from '../../POM/Pages/HomePage';
import SignUpForm from '../../POM/Forms/SignUpForm';
import GaragePage from '../../POM/Pages/GaragePage';
import {testData} from '../../test-data/testData';
import SignInForm from '../../POM/Forms/SignInForm';
import { usersList } from '../../test-data/users';

let homePage: HomePage;
let signUpForm: SignUpForm;
let garagePage: GaragePage;
let signInForm: SignInForm;

test.describe("Login and Save State", () => {
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        garagePage = new GaragePage(page);
        signInForm = new SignInForm(page);

        await homePage.open();
        await homePage.clickSignInButton();
    });

    test("Login with valid credentials and save state", async ({page}) => {
        await signInForm.loginWithCredentials(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
        await garagePage.verifyGaragePageIsOpened();
        await page.context().storageState({ path: 'test-data/states/mainUserState.json' });
    });
});