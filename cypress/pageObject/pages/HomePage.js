class HomePage {
  visit() {
    cy.visit("/");
  }

  clickFormsCard() {
    cy.contains(".card-body", "Forms").click();
  }
}

module.exports = {
  HomePage
};


