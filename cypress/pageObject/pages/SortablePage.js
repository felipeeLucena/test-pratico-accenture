class SortablePage {
  constructor() {
    this.selectors = {
      listTab: "#demo-tab-list",
      gridTab: "#demo-tab-grid",
      listContainer: "#demo-tabpane-list",
      gridContainer: "#demo-tabpane-grid",
      listItem: "#demo-tabpane-list .list-group-item",
      gridItem: "#demo-tabpane-grid .list-group-item"
    };
  }

  mapCurrentPositions() {
    return cy.get(this.selectors.listItem).then($items => {
      const items = Array.from($items);
      const positions = {};
      
      items.forEach((item, index) => {
        const text = item.textContent.trim();
        positions[text] = index;
      });
      
      return positions;
    });
  }

  sortListItemsInDescendingOrder() {
    cy.get(this.selectors.listContainer).should("be.visible");
    
    cy.get(this.selectors.listItem).then($items => {
      const items = Array.from($items);
      const targetOrder = ["Six", "Five", "Four", "Three", "Two", "One"];
      const container = items[0].parentElement;
      
      targetOrder.forEach((targetText, targetIndex) => {
        const item = items.find(el => el.textContent.trim() === targetText);
        const currentIndex = items.indexOf(item);
        
        if (currentIndex !== targetIndex) {
          const targetItem = items[targetIndex];
          container.insertBefore(item, targetItem);
          items.splice(currentIndex, 1);
          items.splice(targetIndex, 0, item);
        }
      });
    });
    
    cy.wait(1000);
  }

  expectListItemsInDescendingOrder() {
    const expectedOrder = ["Six", "Five", "Four", "Three", "Two", "One"];
    
    cy.get(this.selectors.listItem).should("have.length", 6);
    
    expectedOrder.forEach((text, index) => {
      cy.get(this.selectors.listItem).eq(index).should("contain.text", text);
    });
  }
}

module.exports = {
  SortablePage
};

