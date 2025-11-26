class WebTablesPage {
  openAddForm() {
    cy.get("#addNewRecordButton").should("be.visible").click();
  }

  fillRegistrationForm(recordData) {
    cy.get("#firstName").should("be.visible").clear().type(recordData.firstName);
    cy.get("#lastName").should("be.visible").clear().type(recordData.lastName);
    cy.get("#userEmail").should("be.visible").clear().type(recordData.email);
    cy.get("#age").should("be.visible").clear().type(String(recordData.age));
    cy.get("#salary").should("be.visible").clear().type(String(recordData.salary));
    cy.get("#department")
      .should("be.visible")
      .clear()
      .type(recordData.department);
  }

  submitRegistration() {
    cy.get("#submit").should("be.visible").click();
  }

  createRecord(recordData) {
    this.openAddForm();
    this.fillRegistrationForm(recordData);
    this.submitRegistration();
  }

  searchByEmail(email) {
    cy.get("#searchBox").should("be.visible").clear().type(email);
  }

  expectRecordVisibleByEmail(email) {
    this.searchByEmail(email);
    cy.get(".rt-tbody")
      .contains(".rt-tr-group", email)
      .should("be.visible");
  }

  expectRecordNotVisibleByEmail(email) {
    this.searchByEmail(email);
    cy.get(".rt-tbody").should("not.contain.text", email);
  }

  editRecordByEmail(email, updatedData) {
    this.searchByEmail(email);

    cy.get(".rt-tbody")
      .contains(".rt-tr-group", email)
      .should("be.visible")
      .within(() => {
        cy.get('[title="Edit"]').should("be.visible").click();
      });

    this.fillRegistrationForm(updatedData);
    this.submitRegistration();
  }

  deleteRecordByEmail(email) {
    this.searchByEmail(email);

    cy.get(".rt-tbody")
      .contains(".rt-tr-group", email)
      .should("be.visible")
      .within(() => {
        cy.get('[title="Delete"]').should("be.visible").click();
      });
  }
}

module.exports = {
  WebTablesPage
};


