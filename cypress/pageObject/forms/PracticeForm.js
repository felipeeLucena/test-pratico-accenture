class PracticeForm {
  fillFirstName(firstName) {
    cy.get("#firstName").clear().type(firstName);
  }

  fillLastName(lastName) {
    cy.get("#lastName").clear().type(lastName);
  }

  fillEmail(email) {
    cy.get("#userEmail").clear().type(email);
  }

  selectGender(genderLabel) {
    cy.contains("#genterWrapper label", genderLabel).click();
  }

  fillMobile(mobile) {
    cy.get("#userNumber").clear().type(mobile);
  }

  selectHobby(hobbyLabel) {
    cy.contains("#hobbiesWrapper label", hobbyLabel).click();
  }

  uploadPicture(filePath) {
    cy.get("#uploadPicture").selectFile(filePath, { force: true });
  }

  fillCurrentAddress(address) {
    cy.get("#currentAddress").clear().type(address);
  }

  submit() {
    cy.get("#submit").click({ force: true });
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


