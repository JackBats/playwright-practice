import test, { expect } from "@playwright/test";
import HomePage from "../../POM/Pages/HomePage";
import SignUpForm from "../../POM/Forms/SignUpForm";
import SignInForm from "../../POM/Forms/SignInForm";
import GaragePage from "../../POM/Pages/GaragePage";
import ProfilePage from "../../POM/Pages/ProfilePage";
import { usersList } from "../../test-data/users";
import AuthController from "../../API/controllers/AuthController";
let homePage: HomePage;
let signUpForm: SignUpForm;
let signInForm: SignInForm;
let garagePage: GaragePage;
let profilePage: ProfilePage;
let authController: AuthController;

test.describe("Mock API requests", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signUpForm = new SignUpForm(page);
    signInForm = new SignInForm(page);
    garagePage = new GaragePage(page);
    profilePage = new ProfilePage(page);
  });

  test("Mock response", async ({ page }) => {
    await homePage.open();
    await homePage.clickSignInButton();

    const fakeResponse = {
      status: "ok",
      data: {
        userId: 237987,
        photoFilename: "default-user.png",
        name: "Polar",
        lastName: "Bear",
      },
    };

    await page.route("**/api/users/profile", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(fakeResponse),
      });

      await signInForm.loginWithCredentials(
        usersList.mainUser.email,
        usersList.mainUser.password
      );
      await garagePage.verifyGaragePageIsOpened();
      await profilePage.visitProfilePage();
      await profilePage.verifyProfileName(
        fakeResponse.data.name + " " + fakeResponse.data.lastName
      );
    });
  });
});

test.describe("Postitve tests", () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        authController = new AuthController(request);
      
      sid = await authController.getSID(usersList.mainUser.email,usersList.mainUser.password);
    });

    test("GET cars [api/cars]", async ({ request }) => {
      
      const response = await request.get("api/cars", {
        headers: {
          Cookie: sid,
        },
      });

      const responseBody = await response.json();
      expect(response.status()).toBe(200);
    });

    test("POST add new car BMW X6 [api/cars]", async ({ request }) => {
      const carToAdd = {
        carBrandId: 2,
        carModelId: 9,
        mileage: 1333,
      };
      const response = await request.post("api/cars", {
        data: carToAdd,
        headers: {
          Cookie: sid,
        },
      });

      expect(response.status()).toBe(201);
      const responseBody = await response.json();

      expect(responseBody.data.carBrandId).toBe(carToAdd.carBrandId);
      expect(responseBody.data.carModelId).toBe(carToAdd.carModelId);
      expect(responseBody.data.mileage).toBe(carToAdd.mileage);
      expect(responseBody.data.initialMileage).toBe(carToAdd.mileage);
      expect(responseBody.data.brand).toBe("BMW");
      expect(responseBody.data.model).toBe("X6");
    });

    test("DELETE car [api/cars/{carId}]", async ({ request }) => {
      // First, add a car to delete
      const carToDelete = {
        carBrandId: 2,
        carModelId: 9,
        mileage: 1333,
      };
      const response = await request.post("api/cars", {
        data: carToDelete,
        headers: {
          Cookie: sid,
        },
      });

      const responseBody = await response.json();
      expect(response.status()).toBe(201);

      const carId = responseBody.data.id;

      // Now delete the car
      const deleteResponse = await request.delete(`api/cars/${carId}`, {
        headers: {
          Cookie: sid,
        },
      });

      const deleteResponseBody = await deleteResponse.json();
      expect(deleteResponse.status()).toBe(200);
      expect(deleteResponseBody.status).toBe("ok");
      expect(deleteResponseBody.data.carId).toBe(carId);
    });
});


test.describe("Negative tests", () => {
    test("GET cars without auth [api/cars]", async ({ request }) => {
      const response = await request.get("api/cars");
      expect(response.status()).toBe(401);
    });

    test("POST add new car without auth [api/cars]", async ({ request }) => {
      const carToAdd = {
        carBrandId: 2,
        carModelId: 9,
        mileage: 1333,
      };
      const response = await request.post("api/cars", {
        data: carToAdd,
      });

      expect(response.status()).toBe(401);
    });
}); 

