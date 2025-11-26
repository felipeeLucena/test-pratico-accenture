class InteractionsPage {
  openSortable() {
    cy.contains("span", "Sortable").should("be.visible").click();
  }
}

module.exports = {
  InteractionsPage
};

