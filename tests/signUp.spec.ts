import { test, expect } from '@playwright/test';
import HomePage from '../POM/Pages/HomePage';
import SignUpForm from '../POM/Forms/SignUpForm';
import GaragePage from '../POM/Pages/GaragePage';
import {testData} from '../test-data/testData';
let homePage: HomePage;
let signUpForm: SignUpForm;
let garagePage: GaragePage;

test.describe('Sign Up Form Tests', () => {

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    garagePage = new GaragePage(page);
    await homePage.open();
    await homePage.clickSignUpButton();
  });

  test.describe('Negative Tests', () => {
    test('Check the Name field is requiered - "Name required" error message', async () => {
      await signUpForm.triggerEmptyErrorOnField('name');
      await signUpForm.verifyErrorIsDisplayed('Name required');
      await signUpForm.verifyFieldHasRedBorder(signUpForm['nameInput']);
    });

    test('Check the Name field is filled with invalid data - "Name is invalid" error message', async () => {
      for (const name of testData.invalidNames) {
        await signUpForm.enterName(name);
        await signUpForm.triggerEmptyErrorOnField('name');
        await signUpForm.verifyErrorIsDisplayed('Name is invalid');
        await signUpForm.verifyFieldHasRedBorder(signUpForm['nameInput']);
      }
    });

    test('Check the Name field Length validation - should show error for less than 2 characters', async () => {
      await signUpForm.enterName('A');
      await signUpForm.triggerEmptyErrorOnField('name');
      await signUpForm.verifyErrorIsDisplayed('Name has to be from 2 to 20 characters long');
      await signUpForm.verifyFieldHasRedBorder(signUpForm['nameInput']);
    });

    test('Check the Name field Length validation - should show error for more than 20 characters', async () => {
      await signUpForm.enterName('A'.repeat(21));
      await signUpForm.triggerEmptyErrorOnField('name');
      await signUpForm.verifyErrorIsDisplayed('Name has to be from 2 to 20 characters long');
      await signUpForm.verifyFieldHasRedBorder(signUpForm['nameInput']);
    });

    test('Check the Last Name field is requiered - "Last name required" error message', async () => {
      await signUpForm.triggerEmptyErrorOnField('lastName');
      await signUpForm.verifyErrorIsDisplayed('Last name required');
      await signUpForm.verifyFieldHasRedBorder(signUpForm['lastNameInput']);
    });

    test('Check the Last Name field is filled with invalid data - "Last name is invalid" error message', async () => {
      for (const lastName of testData.invalidNames) {
        await signUpForm.enterLastName(lastName);
        await signUpForm.triggerEmptyErrorOnField('lastName');
        await signUpForm.verifyErrorIsDisplayed('Last name is invalid');
        await signUpForm.verifyFieldHasRedBorder(signUpForm['lastNameInput']);
      }
    });

    test('Check the Last Name field Length validation - should show error for less than 2 characters', async () => {
      await signUpForm.enterLastName('A');
      await signUpForm.triggerEmptyErrorOnField('lastName');
      await signUpForm.verifyErrorIsDisplayed('Last name has to be from 2 to 20 characters long');
      await signUpForm.verifyFieldHasRedBorder(signUpForm['lastNameInput']);
    });

    test('Check the Last Name field Length validation - should show error for more than 20 characters', async () => {
      await signUpForm.enterLastName('A'.repeat(21));
      await signUpForm.triggerEmptyErrorOnField('lastName');
      await signUpForm.verifyErrorIsDisplayed('Last name has to be from 2 to 20 characters long');
      await signUpForm.verifyFieldHasRedBorder(signUpForm['lastNameInput']);
    });

    test('Check the Email field is requiered - "Email required" error message', async () => {
      await signUpForm.triggerEmptyErrorOnField('email');
      await signUpForm.verifyErrorIsDisplayed('Email required');
      await signUpForm.verifyFieldHasRedBorder(signUpForm['emailInput']);
    });

    test('Check the Email field is filled with invalid data - "Email is invalid" error message', async () => {
      for (const email of testData.invalidEmails) {
        await signUpForm.enterEmail(email);
        await signUpForm.triggerEmptyErrorOnField('email');
        await signUpForm.verifyErrorIsDisplayed('Email is incorrect');
        await signUpForm.verifyFieldHasRedBorder(signUpForm['emailInput']);
      }
    });

    test('Check the Password field is requiered - "Password required" error message', async () => {
      await signUpForm.triggerEmptyErrorOnField('password');
      await signUpForm.verifyErrorIsDisplayed('Password required');
      await signUpForm.verifyFieldHasRedBorder(signUpForm['passwordInput']);
    });

    test('Check the Password field is filled with invalid data - "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error message', async () => {
      for (const password of testData.invalidPasswords) {
        await signUpForm.enterPassword(password);
        await signUpForm.triggerEmptyErrorOnField('password');
        await signUpForm.verifyErrorIsDisplayed('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
        await signUpForm.verifyFieldHasRedBorder(signUpForm['passwordInput']);
      }
    });

    test('Check the Confirm Password field is requiered - "Re-enter password required" error message', async () => {
        await signUpForm.triggerEmptyErrorOnField('confirmPassword');
        await signUpForm.verifyErrorIsDisplayed('Re-enter password required');
        await signUpForm.verifyFieldHasRedBorder(signUpForm['confirmPasswordInput']);
    });

    test('Check the Re-enter Password field is filled with invalid data - "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter" error message', async () => {
        for (const password of testData.invalidPasswords) {
            await signUpForm.enterConfirmPassword(password);
            await signUpForm.triggerEmptyErrorOnField('confirmPassword');
            await signUpForm.verifyErrorIsDisplayed('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
            await signUpForm.verifyFieldHasRedBorder(signUpForm['confirmPasswordInput']);
        }
    });

    test('Check the Register button is disabled when all fields are empty', async () => {
        await expect(signUpForm['signUpButton']).toBeDisabled();
    });

    test('Check the Register button is disabled when some fields are filled with invalid data', async () => {
        await signUpForm.enterName('John');
        await signUpForm.enterLastName('Doe');
        await signUpForm.enterEmail('john.doe@example.com');
        await expect(signUpForm['signUpButton']).toBeDisabled();
    });

    test('Check the Register button is disabled when at least one field is empty', async () => {
        await signUpForm.enterLastName('Doe');
        await signUpForm.enterEmail('john.doe@example.com');
        await signUpForm.enterPassword(testData.validPassword);
        await signUpForm.enterConfirmPassword(testData.validPassword);
        await expect(signUpForm['signUpButton']).toBeDisabled();
    });
  });

  test.describe('Positive Tests', () => {
    test('Check the Sign Up form is opened', async () => {
      await signUpForm.verifyFormIsOpened();
    });

    test('Check the Sign Up form can be closed', async () => {
      await signUpForm.closeForm();
      await expect(signUpForm['form']).not.toBeVisible();
    });

    test('Check the Name field is filled with valid data', async () => {
      await signUpForm.enterName(testData.validName);
      await signUpForm.verifyErrorIsNotDisplayed('Name required');
      await signUpForm.verifyErrorIsNotDisplayed('Name is invalid');
      await signUpForm.verifyErrorIsNotDisplayed('Name has to be from 2 to 20 characters long');
    });

    test('Check the Last Name field is filled with valid data', async () => {
      await signUpForm.enterLastName(testData.validLastName);
      await signUpForm.verifyErrorIsNotDisplayed('Last name required');
      await signUpForm.verifyErrorIsNotDisplayed('Last name is invalid');
      await signUpForm.verifyErrorIsNotDisplayed('Last name has to be from 2 to 20 characters long');
    });

    test('Check the Email field is filled with valid data', async () => {
      await signUpForm.enterEmail(testData.validEmail);
      await signUpForm.verifyErrorIsNotDisplayed('Email required');
      await signUpForm.verifyErrorIsNotDisplayed('Email is incorrect');
    });

    test('Check the Password and Confirm Password fields are filled with valid data', async () => {
      await signUpForm.enterPassword(testData.validPassword);
      await signUpForm.verifyErrorIsNotDisplayed('Password required');
      await signUpForm.verifyErrorIsNotDisplayed('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
      await signUpForm.enterConfirmPassword(testData.validPassword);
      await signUpForm.verifyErrorIsNotDisplayed('Confirm Password required');
      await signUpForm.verifyErrorIsNotDisplayed('Confirm Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Check the Register button is enabled when all fields are filled with valid data', async () => {
      await signUpForm.fillSignUpForm(testData.validName, testData.validLastName, testData.validEmail, testData.validPassword, testData.validPassword);
      await expect(signUpForm['signUpButton']).toBeEnabled();
    });

    test('Check the Sign Up form can be submitted with valid data', async () => {
      await signUpForm.fillSignUpForm(testData.validName, testData.validLastName, testData.validEmail, testData.validPassword, testData.validPassword);
      await garagePage.verifyGaragePageIsOpened();
    });
  });  
});