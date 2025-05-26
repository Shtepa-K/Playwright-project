require('dotenv').config();
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
//  testDir: './tests',

  use: {
    headless: false,
    browserName: 'chromium',
    storageState: 'storage/user.json', // ⬅️ добавлено для авторизации через сохранённый state
  },
});