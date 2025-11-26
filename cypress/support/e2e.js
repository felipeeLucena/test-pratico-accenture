import "./commands";
import "cypress-plugin-api";

Cypress.on("uncaught:exception", () => {
  return false;
});