//import test from "@playwright/test";
import GaragePage from "../POM/Pages/GaragePage";
import SignInForm from "../POM/Forms/SignInForm";
import HomePage from "../POM/Pages/HomePage";
import { usersList } from "../test-data/users";
import { describe } from "node:test";
import { test } from "../POM/fixtures/userGaragePage.fixture";

let garagePage: GaragePage;
let signinForm: SignInForm;
let homePage: HomePage;

test.describe('Garage Page tests without fixtures', () => {

    test.use({ storageState: 'test-data/states/mainUserState.json' });

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        signinForm = new SignInForm(page);
        homePage = new HomePage(page);

        // await homePage.open();
        // await homePage.clickSignInButton();
        // await signinForm.loginWithCredentials(usersList.mainUser.email, usersList.mainUser.password);
        // await garagePage.verifyPageIsOpen();
        // // await garagePage.open();
        await garagePage.visitGaragePage();
    })

    

    test('Add BMW X5 to Garage', async () => {
        await garagePage.addNewCar('BMW', 'X5', '333');
        await garagePage.verifyLastAddedCarName('BMW X5');
    })

    test('Add Porsche Panamera to Garage', async () => {
        await garagePage.addNewCar('Porsche', 'Panamera', '333');
        await garagePage.verifyLastAddedCarName('Porsche Panamera');
    })

    test('Add Audi A6 to Garage', async () => {
        await garagePage.addNewCar('Audi', 'A6', '333');
        await garagePage.verifyLastAddedCarName('Audi  A6');
    })

    test('Add Audi R8 to Garage', async () => {
        await garagePage.addNewCar('Audi', 'R8', '333');
        await garagePage.verifyLastAddedCarName('Audi R8');
    })

    test('Add Fiat Panda to Garage', async () => {
        await garagePage.addNewCar('Fiat', 'Panda', '333');
        await garagePage.verifyLastAddedCarName('Fiat Panda');
    })
})

test.describe('Garage Page tests with fixtures', () => {
    test('Add BMW X5 to Garage', async ({ garagePage }) => {
        await garagePage.addNewCar('BMW', 'X5', '333');
        await garagePage.verifyLastAddedCarName('BMW X5');
    });
    
    test('Add Porsche Panamera to Garage', async ({ garagePage }) => {
        await garagePage.addNewCar('Porsche', 'Panamera', '333');
        await garagePage.verifyLastAddedCarName('Porsche Panamera');
    })
    
    test('Add Audi A6 to Garage', async ({ garagePage }) => {
        await garagePage.addNewCar('Audi', 'A6', '333');
        await garagePage.verifyLastAddedCarName('Audi  A6');
    })
    
    test('Add Audi R8 to Garage', async ({ garagePage }) => {
        await garagePage.addNewCar('Audi', 'R8', '333');
        await garagePage.verifyLastAddedCarName('Audi R8');
    })
    
    test('Add Fiat Panda to Garage', async ({ garagePage }) => {
        await garagePage.addNewCar('Fiat', 'Panda', '333');
        await garagePage.verifyLastAddedCarName('Fiat Panda');
    })


});