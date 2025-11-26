class WidgetsPage {
  openProgressBar() {
    cy.contains("span", "Progress Bar").should("be.visible").click();
  }
}

module.exports = {
  WidgetsPage
};

