const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { HomePage } = require("../../pageObject/pages/HomePage");
const { FormsPage } = require("../../pageObject/pages/FormsPage");
const { PracticeForm } = require("../../pageObject/forms/PracticeForm");
const { generateStudentData } = require("../../../src/utils/practiceFormDataGenerator");

const homePage = new HomePage();
const formsPage = new FormsPage();
const practiceForm = new PracticeForm();

let studentData;

Given("que eu acesse a página Practice Form", () => {
  homePage.visit();
  homePage.clickFormsCard();
  formsPage.openPracticeForm();
});

When("eu preencher o formulário de estudante com dados válidos", () => {
  studentData = generateStudentData();

  practiceForm.fillFirstName(studentData.firstName);
  practiceForm.fillLastName(studentData.lastName);
  practiceForm.fillEmail(studentData.email);
  practiceForm.selectGender("Male");
  practiceForm.fillMobile(studentData.mobile);
  practiceForm.selectHobby("Sports");
  practiceForm.uploadPicture("cypress/fixtures/upload-test.txt");
  practiceForm.fillCurrentAddress(studentData.address);
});

When("eu submeter o formulário de estudante", () => {
  practiceForm.submit();
});

Then("o resumo do formulário deve ser exibido em um popup", () => {
  practiceForm.expectModalVisible();
});

Then("o popup deve ser fechado com sucesso", () => {
  practiceForm.closeModal();
});


