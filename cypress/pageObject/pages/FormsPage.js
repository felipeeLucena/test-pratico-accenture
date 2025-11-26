class FormsPage {
  openPracticeForm() {
    cy.contains("span", "Practice Form").should("be.visible").click();
  }
}

module.exports = {
  FormsPage
};


