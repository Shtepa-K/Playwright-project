import { test as baseTest } from '@playwright/test';
import { GaragePage } from '../pages/GaragePage';  

export type Options = {
  startUrl: string;
};

// Расширяем базовый тест, добавляя опцию startUrl и фикстуру userGaragePage
export const test = baseTest.extend<Options & { userGaragePage: GaragePage }>({
  // Опция по умолчанию — URL, куда переходить после логина
  startUrl: ['https://guest:welcome2qauto@qauto.forstudy.space/panel/garage', { option: true }],

  // Фикстура, использующая storage state и переход на страницу Garage
  userGaragePage: async ({ browser, startUrl }, use) => {
    const context = await browser.newContext({ storageState: 'storage/user.json' });
    const page = await context.newPage();

    const garagePage = new GaragePage(page);
    await page.goto(startUrl);

    await use(garagePage);

    await page.close();
    await context.close();
  },
});
export const expect = baseTest.expect