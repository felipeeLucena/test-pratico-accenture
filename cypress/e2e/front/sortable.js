const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const { HomePage } = require("../../pageObject/pages/HomePage");
const { InteractionsPage } = require("../../pageObject/pages/InteractionsPage");
const { SortablePage } = require("../../pageObject/pages/SortablePage");

const homePage = new HomePage();
const interactionsPage = new InteractionsPage();
const sortablePage = new SortablePage();

Given("que eu acesse a página Sortable", () => {
  homePage.visit();
  homePage.clickInteractionsCard();
  interactionsPage.openSortable();
});

When("eu ordenar os elementos da lista em ordem decrescente", () => {
  sortablePage.sortListItemsInDescendingOrder();
});

Then("os elementos devem estar ordenados em ordem decrescente", () => {
  sortablePage.expectListItemsInDescendingOrder();
});

