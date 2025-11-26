import "./commands";
import "cypress-plugin-api";
import "@4tw/cypress-drag-drop";
import "@shelex/cypress-allure-plugin";

Cypress.on("uncaught:exception", () => {
  return false;
});