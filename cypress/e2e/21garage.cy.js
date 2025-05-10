const { generateUserData } = require('../helpers/datareg');
require('../support/commands');

describe('Example of registrtion and log in', () => {
  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space')
     
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
       
       cy.intercept('POST', '/api/cars').as('AddCars');
                 
       cy.get('.modal-footer > .btn-primary').contains('Add').click();

       cy.wait('@AddCars').then((interception)=> {
         expect(interception.response.statusCode).to.eq(201);
         let carsid = interception.response.body.data.id
         cy.wrap(carsid).as('CarsId')

       console.log(carsid)

       })
       
       cy.get('@CarsId').then((carsid)=> {
       cy.request({
  method: 'GET',
  url: '/api/cars'
}).then((response) => {
  expect(response.status).to.eq(200);
 let carlist = response.body.data.find(car => car.id === carsid);
    expect(carlist).to.not.be.undefined;
    expect(carlist.brand).to.eq('BMW');
    expect(carlist.model).to.eq('X6');
});
       });     
  
       
       cy.get('@CarsId').then((carsid) => {
         const reportedAt = new Date().toISOString();
       let expenseData = {
   carId: carsid,
  reportedAt: reportedAt,
  mileage: 16,
  liters: 10,
  totalCost: 1000,
       }
         
         cy.wrap(reportedAt).as('reportedAt')
         cy.wrap(expenseData).as('expenseData')
     cy.addExpense(expenseData)
       });
       
       cy.get('[routerlink="expenses"]').click();

cy.get('@reportedAt').then((reportedAt) => {
  const formattedDate = new Date(reportedAt)
    .toLocaleDateString('en-GB')  // формат DD/MM/YYYY
    .replace(/\//g, '.');         // в формате DD.MM.YYYY, как на сайте

  cy.get('.font-weight-bold').should('contain', formattedDate);
});

cy.get('@expenseData').then((expense) => {
  cy.get('tbody > tr > :nth-child(2)').should('contain', expense.mileage);
  cy.get('tbody > tr > :nth-child(3)').should('contain', `${expense.liters}L`);
  cy.get('tbody > tr > :nth-child(4)').should('contain', `${expense.totalCost.toFixed(2)} USD`);
});
       

})

});


