import "./commands";
import "cypress-plugin-api";
import "@4tw/cypress-drag-drop";

Cypress.on("uncaught:exception", () => {
  return false;
});