const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { HomePage } = require("../../pageObject/pages/HomePage");
const { AlertsFrameWindowsPage } = require("../../pageObject/pages/AlertsFrameWindowsPage");
const { BrowserWindowsPage } = require("../../pageObject/pages/BrowserWindowsPage");

const homePage = new HomePage();
const alertsFrameWindowsPage = new AlertsFrameWindowsPage();
const browserWindowsPage = new BrowserWindowsPage();

Given("que eu acesse a página Browser Windows", () => {
  homePage.visit();
  homePage.clickAlertsFrameWindowsCard();
  alertsFrameWindowsPage.openBrowserWindows();
});

When("eu clicar no botão New Window", () => {
  browserWindowsPage.openNewWindowAndVisitSamplePage();
});

Then("a nova janela deve exibir a mensagem This is a sample page", () => {
  browserWindowsPage.expectSamplePageVisible();
});

Then("eu devo retornar para a página Browser Windows", () => {
  browserWindowsPage.closeSamplePageAndReturn();
  browserWindowsPage.expectSamplePageNotVisible();
  browserWindowsPage.expectBrowserWindowsPageVisible();
});


