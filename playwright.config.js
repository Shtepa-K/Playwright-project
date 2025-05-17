require('dotenv').config()

module.exports = {
  
  testDir: './tests',
  use: {
      headless: false,
      browserName: 'chromium',

  },
};