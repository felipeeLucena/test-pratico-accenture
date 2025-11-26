const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { BookstoreApi } = require("../../pageObject/api/BookstoreApi");
const { generateUserCredentials } = require("../../../src/utils/userGenerator");

const bookstoreApi = new BookstoreApi();

let userName;
let password;
let userId;
let token;
let availableIsbns = [];

When("eu criar um novo usuário válido", () => {
  ({ userName, password } = generateUserCredentials());

  return bookstoreApi.createUser(userName, password).then(response => {
    expect(response.status).to.equal(201);
    userId = response.body.userID;
  });
});

Then("o usuário deve ser criado com sucesso", () => {
  expect(userId).to.be.a("string").and.not.empty;
});

Given("que exista um usuário criado", () => {
  ({ userName, password } = generateUserCredentials());

  return bookstoreApi.createUser(userName, password).then(response => {
    expect(response.status).to.equal(201);
    userId = response.body.userID;
  });
});

When("eu gerar um token de acesso para o usuário", () => {
  return bookstoreApi.generateToken(userName, password).then(response => {
    expect(response.status).to.equal(200);
    token = response.body.token;
  });
});

Then("o token de acesso deve ser gerado com sucesso", () => {
  expect(token).to.be.a("string").and.not.empty;
});

Given("que exista um usuário criado com token válido", () => {
  ({ userName, password } = generateUserCredentials());

  return bookstoreApi
    .createUser(userName, password)
    .then(response => {
      expect(response.status).to.equal(201);
      userId = response.body.userID;
      return bookstoreApi.generateToken(userName, password);
    })
    .then(tokenResponse => {
      expect(tokenResponse.status).to.equal(200);
      token = tokenResponse.body.token;
    });
});

When("eu verificar a autorização do usuário", () => {
  return bookstoreApi.confirmAuthorization(userName, password).then(response => {
    expect(response.status).to.equal(200);
    expect(response.body).to.equal(true);
  });
});

Then("o usuário deve estar autorizado", () => {
  expect(token).to.be.a("string").and.not.empty;
});

When("eu listar os livros disponíveis", () => {
  return bookstoreApi.listBooks().then(response => {
    expect(response.status).to.equal(200);
    expect(response.body.books.length).to.be.greaterThan(0);
    availableIsbns = response.body.books.map(book => book.isbn);
  });
});

Then("a lista de livros deve ser retornada com sucesso", () => {
  expect(availableIsbns.length).to.be.greaterThan(0);
});

Given("que existam livros disponíveis", () => {
  return bookstoreApi.listBooks().then(response => {
    expect(response.status).to.equal(200);
    availableIsbns = response.body.books.map(book => book.isbn);
  });
});

When("eu alugar dois livros para o usuário", () => {
  const selectedIsbns = availableIsbns.slice(0, 2);

  return bookstoreApi.rentBooks(userId, selectedIsbns, token).then(response => {
    expect(response.status).to.equal(201);
  });
});

Then("o usuário deve possuir os dois livros alugados", () => {
  return bookstoreApi.getUserDetails(userId, token).then(response => {
    expect(response.status).to.equal(200);
    const userBooks = response.body.books.map(book => book.isbn);
    expect(userBooks.length).to.be.greaterThan(0);
  });
});


