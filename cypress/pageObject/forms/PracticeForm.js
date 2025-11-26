class PracticeForm {
  constructor() {
    this.selectors = {
      firstName: "#firstName",
      lastName: "#lastName",
      userEmail: "#userEmail",
      userNumber: "#userNumber",
      currentAddress: "#currentAddress",
      uploadPicture: "#uploadPicture",
      submit: "#submit",
      genterWrapper: "#genterWrapper",
      hobbiesWrapper: "#hobbiesWrapper",
      modalContent: ".modal-content",
      closeLargeModal: "#closeLargeModal"
    };
  }

  fillFirstName(firstName) {
    cy.get(this.selectors.firstName).should("be.visible").clear().type(firstName);
  }

  fillLastName(lastName) {
    cy.get(this.selectors.lastName).should("be.visible").clear().type(lastName);
  }

  fillEmail(email) {
    cy.get(this.selectors.userEmail).should("be.visible").clear().type(email);
  }

  selectGender(genderLabel) {
    cy.contains(`${this.selectors.genterWrapper} label`, genderLabel)
      .should("be.visible")
      .click();
  }

  fillMobile(mobile) {
    cy.get(this.selectors.userNumber).should("be.visible").clear().type(mobile);
  }

  selectHobby(hobbyLabel) {
    cy.contains(`${this.selectors.hobbiesWrapper} label`, hobbyLabel)
      .should("be.visible")
      .click();
  }

  uploadPicture(filePath) {
    cy.get(this.selectors.uploadPicture).should("be.visible").selectFile(filePath, {
      force: true
    });
  }

  fillCurrentAddress(address) {
    cy.get(this.selectors.currentAddress).should("be.visible").clear().type(address);
  }

  submit() {
    cy.get(this.selectors.submit).should("be.visible").click({ force: true });
  }

  expectModalVisible() {
    cy.get(this.selectors.modalContent).should("be.visible");
  }

  closeModal() {
    cy.get(this.selectors.closeLargeModal).scrollIntoView().click({ force: true });
  }
}

module.exports = {
  PracticeForm
};


