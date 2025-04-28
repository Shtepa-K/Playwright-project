describe('Example of checking for the presence of buttons', () => {
    beforeEach(() => {
      cy.visit('https://qauto.forstudy.space/')

    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space');
  });

  it('Finds all header buttons', () => {
    // Перевір кнопки в хедері
    cy.get('button').contains('Sign up').should('exist'); // як на скріншоті
  });

  it('Finds all footer links and icons', () => {
    // Іконки соцмереж
    cy.get('footer').within(() => {
      cy.get('a[href*="facebook"]').should('exist');
      cy.get('a[href*="t.me"]').should('exist');
      cy.get('a[href*="youtube"]').should('exist');
      cy.get('a[href*="instagram"]').should('exist');
      cy.get('a[href*="linkedin"]').should('exist');

      // email та сайт
      cy.contains('ithillel.ua').should('have.attr', 'href');
      cy.contains('support@ithillel.ua').should('have.attr', 'href');
    });
  });
});


