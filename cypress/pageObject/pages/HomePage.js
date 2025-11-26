class HomePage {
  visit() {
    cy.visit("/");
  }

  clickElementsCard() {
    cy.contains(".card-body", "Elements").should("be.visible").click();
  }

  clickFormsCard() {
    cy.contains(".card-body", "Forms").should("be.visible").click();
  }

  clickAlertsFrameWindowsCard() {
    cy.contains(".card-body", "Alerts, Frame & Windows")
      .should("be.visible")
      .click();
  }

  clickWidgetsCard() {
    cy.contains("Widgets").should("be.visible").click();
  }
}

module.exports = {
  HomePage
};


