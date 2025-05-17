
const { faker } = require('@faker-js/faker');

function getRandomUppercaseLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters.charAt(faker.datatype.number({ min: 0, max: letters.length - 1 }));
}

function getRandomLowercaseLetter() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return letters.charAt(faker.datatype.number({ min: 0, max: letters.length - 1 }));
}

function generateSecurePassword() {
  const length = faker.datatype.number({ min: 8, max: 15 });

  const upper = getRandomUppercaseLetter();
  const lower = getRandomLowercaseLetter();
  const digit = faker.datatype.number({ min: 0, max: 9 }).toString();
  const rest = faker.random.alphaNumeric(length - 3);

  const passwordArray = (upper + lower + digit + rest).split('');
  const shuffled = faker.helpers.shuffle(passwordArray).join('');

  return shuffled;
}

function generateUserData() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${faker.datatype.number(1000)}@example.com`;
  const password = generateSecurePassword();

  return { firstName, lastName, email, password };
}

module.exports = { generateUserData };
//const email = ${random.@gmail.com}
