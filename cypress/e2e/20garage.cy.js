const { generateUserData } = require('../helpers/datareg');
require('../support/commands');

describe('Example of registrtion and log in', () => {
  beforeEach(() => {
    cy.visit('/')
     
  })
     it('successful registration', () => {
       const user = generateUserData();
    cy.get('.hero-descriptor_btn').click()
    cy.get('#signupName').type(user.firstName);
    cy.get('#signupLastName').type(user.lastName);
    cy.get('#signupEmail').type(user.email);
    cy.get('#signupPassword').type(user.password, { sensitive: true });
    cy.get('#signupRepeatPassword').type(user.password, { sensitive: true });
    cy.get('.btn').contains('Register').click();
    cy.get('.sidebar > .btn-link').contains('Log out').click();
    cy.login(user.email, user.password);
    
       cy.get('.panel-page_heading > .btn').contains('Add car').click();
       cy.get('#addCarBrand').select('BMW');
       cy.get('#addCarModel').select('X6');
        cy.get('#addCarMileage')
  .type('15')
  .trigger('input')
  .trigger('change')
  .blur();
       cy.get('.modal-footer > .btn-primary').contains('Add').click();
       cy.get('.car_add-expense').contains('Add fuel expense').click();
       cy.get('#addExpenseCar').contains('BMW X6').should('exist');
       cy.get('.input-group-append > .btn > .icon').click();
       //cy.get('.right > .btn > .ngb-dp-navigation-chevron').click();
       cy.get('[aria-label="Tuesday, May 6, 2025"] > .btn-light').click();
       //  cy.get('[aria-label="Wednesday, June 25, 2025"] > .btn-light').click();
       cy.get('#addExpenseMileage')
       .clear()
       .type('16')
       .trigger('input')
      .trigger('change')
      .blur();
       cy.get('#addExpenseLiters').type('10')
       cy.get('#addExpenseTotalCost').type('1000').blur()
       cy.get('.modal-footer > .btn-primary').contains('Add').click();
});
});
