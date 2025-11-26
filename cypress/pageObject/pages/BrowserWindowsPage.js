class BrowserWindowsPage {
  constructor() {
    this.selectors = {
      windowButton: "#windowButton",
      body: "body"
    };
  }

  openNewWindowAndVisitSamplePage() {
    cy.window().then(win => {
      cy.stub(win, "open").as("windowOpen");
    });

    cy.get(this.selectors.windowButton).should("be.visible").click();

    cy.get("@windowOpen").then(stub => {
      const url = stub.getCall(0).args[0];
      cy.visit(url);
    });
  }

  expectSamplePageVisible() {
    cy.contains("This is a sample page").should("be.visible");
  }

  closeSamplePageAndReturn() {
    cy.go("back");
  }

  expectSamplePageNotVisible() {
    cy.get(this.selectors.body).should("not.contain", "This is a sample page");
  }

  expectBrowserWindowsPageVisible() {
    cy.contains("Browser Windows").should("be.visible");
  }
}

module.exports = {
  BrowserWindowsPage
};


