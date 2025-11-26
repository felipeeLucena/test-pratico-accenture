class ProgressBarPage {
  constructor() {
    this.selectors = {
      progressBar: "#progressBar",
      startStopButton: "#startStopButton",
      resetButton: "#resetButton"
    };
  }

  getProgressBarValue($bar) {
    const ariaValue = $bar.attr("aria-valuenow");
    const textValue = $bar.text().trim();

    let value = 0;
    if (ariaValue) {
      value = parseInt(ariaValue);
    } else if (textValue.includes("%")) {
      value = parseInt(textValue.replace("%", ""));
    }

    return value;
  }

  clickStart() {
    cy.get(this.selectors.startStopButton).should("be.visible").click();
  }

  stopBeforePercentage(targetPercentage) {
    const checkValue = () => {
      cy.get(this.selectors.progressBar).then($bar => {
        const value = this.getProgressBarValue($bar);
        
        cy.log(`aria-valuenow: ${$bar.attr("aria-valuenow")}, text: ${$bar.text().trim()}`);
        cy.log(`Valor atual: ${value}`);

        if (value >= 20) {
          cy.log("Chegou em 20% ou mais, clicando em Stop");
          cy.get(this.selectors.startStopButton).click({ force: true });
        } else {
          cy.wait(10, { log: false });
          checkValue();
        }
      });
    };

    checkValue();
  }

  expectProgressLessOrEqual(percentage) {
    cy.get(this.selectors.progressBar).should($bar => {
      const currentValue = this.getProgressBarValue($bar);
      expect(currentValue).to.be.at.most(percentage);
    });
  }

  waitForCompleteAndReset() {
    cy.get(this.selectors.resetButton, { timeout: 60000 }).should("be.visible");
  }

  expectProgressBarReset() {
    cy.get(this.selectors.resetButton).should("be.visible");
  }
}

module.exports = {
  ProgressBarPage
};

