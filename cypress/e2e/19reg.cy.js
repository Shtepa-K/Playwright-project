const { generateUserData } = require('../helpers/datareg');
require('../support/commands');

describe('Example of registrtion and log in', () => {
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space'),
      cy.get('.hero-descriptor_btn').click()
  })
  //Перевірка вимог до реєстрації
  //Перевірка поля "Name"
  it('Checking display error for empty field "Name"', () => {
      cy.get('#signupName').focus().blur(),
      cy.contains('Name required').should('be.visible'),
    cy.get('.btn').should('be.disabled'),
         cy.get('.btn').should('be.disabled');    
    }),
  it('Checking display error when entering numbers in the field "Name"', () => {
      cy.get('#signupName').type('12').blur(),
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Name is invalid').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    }); 
  it('Checking display error when Cyrillic in the field "Name"', () => {
      cy.get('#signupName').type('яч').blur(),
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Name is invalid').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    }); 
  it('Checking display error when symbols in the field "Name"', () => {
      cy.get('#signupName').type('*/+').blur(),
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Name is invalid').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    }); 
  it('Checking display error with less than 2 letters in the field "Name"', () => {
      cy.get('#signupName').type('A').blur(),
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Name has to be from 2 to 20 characters long').should('be.visible'),
         cy.get('.btn').should('be.disabled');         
    }); 
  it('Checking display error with more than 20 letters in the field "Name"', () => {
      cy.get('#signupName').type('Incomprehensibilities').blur(),
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Name has to be from 2 to 20 characters long').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    }); 
  it('Check field "Name" if there is a space', () => {
      cy.get('#signupName').type('   test  ').blur(),
        cy.get('#signupName')
        .invoke('val')
        .then((value) => {
         expect(value.trim()).to.equal('test')
        })
      cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Name is invalid').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
  }); 
  
//Перевірка поля "LastName"
     it('Checking display error for empty field "LastName"', () => {
       cy.get('#signupLastName').focus().blur(),
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Last name required').should('be.visible'),
         cy.get('.btn').should('be.disabled');    
    })
    it('Checking display error when entering numbers in the field "LastName"', () => {
      cy.get('#signupLastName').type('12').blur(),
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Last name is invalid').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    }); 
  it('Checking display error when Cyrillic in the field "LastName"', () => {
      cy.get('#signupLastName').type('яч').blur(),
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Last name is invalid').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    }); 
  it('Checking display error when symbols in the field "LastName"', () => {
      cy.get('#signupLastName').type('*/+').blur(),
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Last name is invalid').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    }); 
  it('Checking display error with less than 2 letters in the field "LastName"', () => {
      cy.get('#signupLastName').type('A').blur(),
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible'),
         cy.get('.btn').should('be.disabled');         
    }); 
  it('Checking display error with more than 20 letters in the field "LastName"', () => {
      cy.get('#signupLastName').type('Incomprehensibilities').blur(),
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Last name has to be from 2 to 20 characters long').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    }); 
  it('Check field "LastName" if there is a space', () => {
      cy.get('#signupLastName').type('   test  ').blur(),
        cy.get('#signupLastName')
        .invoke('val')
        .then((value) => {
         expect(value.trim()).to.equal('test')
        })
      cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Last name is invalid').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
  }); 

//Перевірка поля "Email"
   it('Checking display error for empty field "Email"', () => {
       cy.get('#signupEmail').focus().blur(),
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Email required').should('be.visible'),
         cy.get('.btn').should('be.disabled');    
   })
  it('Checking display error for empty field "Email"', () => {
       cy.get('#signupEmail').type('testemail').blur(),
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Email is incorrect').should('be.visible'),
         cy.get('.btn').should('be.disabled');    
  })
  
//Перевірка поля "Password"
  it('Checking display error for empty field "Password"', () => {
       cy.get('#signupPassword').focus().blur(),
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
      cy.contains('Password required').should('be.visible'),
         cy.get('.btn').should('be.disabled');    
   })
  it('Checking display error for wrong data "Password"', () => {
       cy.get('#signupPassword').type('parol').blur(),
       cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
       cy.contains('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter').should('be.visible'),
         cy.get('.btn').should('be.disabled');    
  })
  it('Checking display error for wrong data "Password"', () => {
       cy.get('#signupPassword').type('123Parol!').blur()
  })
  
  //Перевірка поля "Re-enter password"
  it('Checking display error for empty field "Re-enter password"', () => {
       cy.get('#signupRepeatPassword').focus().blur(),
        cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
         cy.contains('Re-enter password required').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    
   })
  it('Checking display error for wrong data "Re-enter password"', () => {
       cy.get('#signupRepeatPassword').type('123Parol').blur(),
       cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)'),
         cy.contains('Passwords do not match').should('be.visible'),
         cy.get('.btn').should('be.disabled');  
    
  })
   it('successful registration', () => {
    const user = generateUserData();

    cy.get('#signupName').type(user.firstName);
    cy.get('#signupLastName').type(user.lastName);
    cy.get('#signupEmail').type(user.email);
    cy.get('#signupPassword').type(user.password, { sensitive: true });
    cy.get('#signupRepeatPassword').type(user.password, { sensitive: true });

     cy.get('.btn').contains('Register').click();

     cy.get('.sidebar > .btn-link').contains('Log out').click();

     cy.login(user.email, user.password);
   });
  
});
  
