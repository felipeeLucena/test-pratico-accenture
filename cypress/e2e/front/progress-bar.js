const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { HomePage } = require("../../pageObject/pages/HomePage");
const { WidgetsPage } = require("../../pageObject/pages/WidgetsPage");
const { ProgressBarPage } = require("../../pageObject/pages/ProgressBarPage");

const homePage = new HomePage();
const widgetsPage = new WidgetsPage();
const progressBarPage = new ProgressBarPage();

Given("que eu acesse a página Progress Bar", () => {
  homePage.visit();
  homePage.clickWidgetsCard();
  widgetsPage.openProgressBar();
});

When("eu clicar no botão Start", () => {
  progressBarPage.clickStart();
});

When("eu parar a progress bar antes de 25%", () => {
  progressBarPage.stopBeforePercentage(25);
});

Then("o valor da progress bar deve ser menor ou igual a 25%", () => {
  progressBarPage.expectProgressLessOrEqual(25);
});

When("eu clicar no botão Start novamente", () => {
  progressBarPage.clickStart();
});

When("a progress bar chegar a 100%", () => {
  progressBarPage.waitForCompleteAndReset();
});

Then("a progress bar deve ser resetada", () => {
  progressBarPage.expectProgressBarReset();
});

