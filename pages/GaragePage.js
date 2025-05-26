class GaragePage {
  constructor(page) {
    this.page = page;
    this.addButton = page.locator('button:has-text("Add car")');
    this.garageLink = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn.-active[href="/panel/garage"]');
    this.fuelExpensesLink = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn[href="/panel/expenses"]');
    this.instructionsLink = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn[href="/panel/instructions"]');
    this.profileLink = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn[href="/panel/profile"]');
    this.settingsLink = page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn[href="/panel/settings"]');
    this.logoutLink = page.locator('a.btn.btn-link.btext-danger.btn-sidebar.sidebar_btn');
  }

  async open() {
    await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');
  }

  async isCarageVisible() {
    return this.garageLink.isVisible();
  }

  async isAddButtonVisible() {
    return this.addButton.isVisible();
  }
}

module.exports = { GaragePage };