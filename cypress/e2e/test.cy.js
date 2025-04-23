describe('Example of checking for the presence of buttons', () => {
    beforeEach(() => {
       cy.visit('https://guest:welcome2qauto@qauto.forstudy.space');
  });
  // Перевір кнопки в хедері
  it('Finds all header buttons', () => {
    
    cy.get('.hero-descriptor_btn').should('contain', 'Sign up'); 
  });

    // Іконки соцмереж
 it('Finds all footer links and icons', () => {     
  cy.get(' [href="https://www.facebook.com/Hillel.IT.School"]').should('exist');
  cy.get('[href="https://t.me/ithillel_kyiv"] ').should('exist');
  cy.get('[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]').should('exist');
  cy.get('[href="https://www.instagram.com/hillel_itschool/"]').should('exist');
  cy.get('[href="https://www.linkedin.com/school/ithillel/"]').should('exist');
    
    // email та сайт
  cy.contains('ithillel.ua').should('exist');
  cy.get('.h4').should('exist'); 
 
 });
 });
