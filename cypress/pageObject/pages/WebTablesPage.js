class WebTablesPage {
  constructor() {
    this.selectors = {
      addNewRecordButton: "#addNewRecordButton",
      firstName: "#firstName",
      lastName: "#lastName",
      userEmail: "#userEmail",
      age: "#age",
      salary: "#salary",
      department: "#department",
      submit: "#submit",
      searchBox: "#searchBox",
      tbody: ".rt-tbody",
      trGroup: ".rt-tr-group",
      editButton: '[title="Edit"]',
      deleteButton: '[title="Delete"]'
    };
  }

  openAddForm() {
    cy.get(this.selectors.addNewRecordButton).should("be.visible").click();
  }

  fillRegistrationForm(recordData) {
    cy.get(this.selectors.firstName).should("be.visible").clear().type(recordData.firstName);
    cy.get(this.selectors.lastName).should("be.visible").clear().type(recordData.lastName);
    cy.get(this.selectors.userEmail).should("be.visible").clear().type(recordData.email);
    cy.get(this.selectors.age).should("be.visible").clear().type(String(recordData.age));
    cy.get(this.selectors.salary).should("be.visible").clear().type(String(recordData.salary));
    cy.get(this.selectors.department)
      .should("be.visible")
      .clear()
      .type(recordData.department);
  }

  submitRegistration() {
    cy.get(this.selectors.submit).should("be.visible").click();
  }

  createRecord(recordData) {
    this.openAddForm();
    this.fillRegistrationForm(recordData);
    this.submitRegistration();
  }

  searchByEmail(email) {
    cy.get(this.selectors.searchBox).should("be.visible").clear().type(email);
  }

  expectRecordVisibleByEmail(email) {
    this.searchByEmail(email);
    cy.get(this.selectors.tbody)
      .contains(this.selectors.trGroup, email)
      .should("be.visible");
  }

  expectRecordNotVisibleByEmail(email) {
    this.searchByEmail(email);
    cy.get(this.selectors.tbody).should("not.contain.text", email);
  }

  editRecordByEmail(email, updatedData) {
    this.searchByEmail(email);

    cy.get(this.selectors.tbody)
      .contains(this.selectors.trGroup, email)
      .should("be.visible")
      .within(() => {
        cy.get(this.selectors.editButton).should("be.visible").click();
      });

    this.fillRegistrationForm(updatedData);
    this.submitRegistration();
  }

  deleteRecordByEmail(email) {
    this.searchByEmail(email);

    cy.get(this.selectors.tbody)
      .contains(this.selectors.trGroup, email)
      .should("be.visible")
      .within(() => {
        cy.get(this.selectors.deleteButton).should("be.visible").click();
      });
  }
}

module.exports = {
  WebTablesPage
};


