// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//Cypress.Commands.add('login', (email, password) => { ... })
 
Cypress.Commands.add('login', (email, password) => {
  cy.visit('https://guest:welcome2qauto@qauto.forstudy.space');

 cy.get('.header_right > .btn').contains('Sign In').click();
  
  // Ждём появления полей и вводим данные
  cy.get('#signinEmail', { timeout: 10000 }).should('be.visible').type(email);
  cy.get('#signinPassword').type(password, { sensitive: false });
  cy.get('.modal-footer > .btn-primary').contains('Login').click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false; // вимкнути стандартний лог

    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length), // маскування символів
    });
  }

  return originalFn(element, text, options);
});