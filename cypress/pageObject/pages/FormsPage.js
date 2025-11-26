class FormsPage {
  openPracticeForm() {
    cy.contains("span", "Practice Form").click();
  }
}

module.exports = {
  FormsPage
};


