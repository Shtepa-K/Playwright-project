//import { test, expect } from "@playwright/test";
//test.use({ storageState: 'storage/user.json' });
import { test, expect } from '../../fixture/userGaragePage';
import { setLocalStorageValue, getLocalStorageValue } from "../../Helpers/localStorageHelper";


test('login by Storage', async ({ userGaragePage }) => {
       const page = userGaragePage.page;
       await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
       const title = await expect(page).toHaveTitle('Hillel Qauto')
       console.log('Title:', title);
});

test('local Storage', async ({ page }) => {
    await page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
    const value = await page.evaluate(() => {
    return document.title;
      });
    console.log(value);
    await setLocalStorageValue(page, 'testKey', 'testValue');
    let storedValue = await getLocalStorageValue(page, 'testKey');
      console.log(storedValue);
});

test('Garage page', async ({ userGaragePage }) => {
  const isVisible = await userGaragePage.isAddButtonVisible();
  await expect(isVisible).toBeTruthy();
});