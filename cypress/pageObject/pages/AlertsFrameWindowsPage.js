class AlertsFrameWindowsPage {
  openBrowserWindows() {
    cy.contains("span", "Browser Windows").should("be.visible").click();
  }
}

module.exports = {
  AlertsFrameWindowsPage
};


