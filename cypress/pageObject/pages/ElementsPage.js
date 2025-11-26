class ElementsPage {
  openWebTables() {
    cy.contains("span", "Web Tables").should("be.visible").click();
  }
}

module.exports = {
  ElementsPage
};


