class PracticeForm {
  fillFirstName(firstName) {
    cy.get("#firstName").should("be.visible").clear().type(firstName);
  }

  fillLastName(lastName) {
    cy.get("#lastName").should("be.visible").clear().type(lastName);
  }

  fillEmail(email) {
    cy.get("#userEmail").should("be.visible").clear().type(email);
  }

  selectGender(genderLabel) {
    cy.contains("#genterWrapper label", genderLabel)
      .should("be.visible")
      .click();
  }

  fillMobile(mobile) {
    cy.get("#userNumber").should("be.visible").clear().type(mobile);
  }

  selectHobby(hobbyLabel) {
    cy.contains("#hobbiesWrapper label", hobbyLabel)
      .should("be.visible")
      .click();
  }

  uploadPicture(filePath) {
    cy.get("#uploadPicture").should("be.visible").selectFile(filePath, {
      force: true
    });
  }

  fillCurrentAddress(address) {
    cy.get("#currentAddress").should("be.visible").clear().type(address);
  }

  submit() {
    cy.get("#submit").should("be.visible").click({ force: true });
  }

  expectModalVisible() {
    cy.get(".modal-content").should("be.visible");
  }

  closeModal() {
    cy.get("#closeLargeModal").scrollIntoView().click({ force: true });
  }
}

module.exports = {
  PracticeForm
};


