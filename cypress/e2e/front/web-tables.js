const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { HomePage } = require("../../pageObject/pages/HomePage");
const { ElementsPage } = require("../../pageObject/pages/ElementsPage");
const { WebTablesPage } = require("../../pageObject/pages/WebTablesPage");
const { generateWebTableRecord } = require("../../../src/utils/webTablesDataGenerator");

const homePage = new HomePage();
const elementsPage = new ElementsPage();
const webTablesPage = new WebTablesPage();

let currentRecord;
let updatedRecord;
let createdRecordsEmails = [];

Given("que eu acesse a página Web Tables", () => {
  homePage.visit();
  homePage.clickElementsCard();
  elementsPage.openWebTables();
});

When("eu criar um novo registro na Web Table", () => {
  currentRecord = generateWebTableRecord();
  webTablesPage.createRecord(currentRecord);
});

Then("o novo registro deve ser exibido na Web Table", () => {
  webTablesPage.expectRecordVisibleByEmail(currentRecord.email);
});

When("eu editar o registro criado na Web Table", () => {
  updatedRecord = {
    ...currentRecord,
    firstName: `${currentRecord.firstName}_Editado`,
    lastName: `${currentRecord.lastName}_Editado`,
    salary: currentRecord.salary + 1000
  };

  webTablesPage.editRecordByEmail(currentRecord.email, updatedRecord);
});

Then("o registro editado deve ser exibido na Web Table", () => {
  webTablesPage.expectRecordVisibleByEmail(updatedRecord.email);
});

When("eu deletar o registro criado na Web Table", () => {
  webTablesPage.deleteRecordByEmail(updatedRecord.email || currentRecord.email);
});

Then("o registro não deve mais ser exibido na Web Table", () => {
  webTablesPage.expectRecordNotVisibleByEmail(updatedRecord.email || currentRecord.email);
});

When("eu criar 12 novos registros válidos na Web Table", () => {
  createdRecordsEmails = [];

  for (let i = 0; i < 12; i += 1) {
    const record = generateWebTableRecord();
    createdRecordsEmails.push(record.email);
    webTablesPage.createRecord(record);
  }
});

Then("todos os novos registros devem ser exibidos na Web Table", () => {
  createdRecordsEmails.forEach(email => {
    webTablesPage.expectRecordVisibleByEmail(email);
  });
});

When("eu deletar todos os novos registros criados na Web Table", () => {
  createdRecordsEmails.forEach(email => {
    webTablesPage.deleteRecordByEmail(email);
  });
});

Then("nenhum dos novos registros deve ser exibido na Web Table", () => {
  createdRecordsEmails.forEach(email => {
    webTablesPage.expectRecordNotVisibleByEmail(email);
  });
});


