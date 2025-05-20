class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.registerButtonMain = page.locator('.hero-descriptor_btn');
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('button:has-text("Register")');
  }

  async open() {
    await this.page.goto('https://guest:welcome2qauto@qauto.forstudy.space');
  }

  async clickRegisterButton() {
    await this.registerButtonMain.click();
  }

  async fillRegistrationForm(name, lastName, email, password) {
    await this.nameInput.fill(name);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.repeatPasswordInput.fill(password);
  }
}

module.exports = { RegistrationPage };