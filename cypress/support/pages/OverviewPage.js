class OverviewPage {
  elements = {
    header: () => cy.contains('Accounts Overview'),
    accountsTable: () => cy.get('#accountTable'),
    accountRows: () => cy.get('#accountTable tbody tr'),
    accountLinks: () => cy.get('#accountTable tbody tr td a'), 
    balances: () => cy.get('#accountTable tbody tr td:nth-child(2)'), 
    logoutLink: () => cy.contains('Log Out')
  }



  verifyPageLoaded() {
    this.elements.header().should('be.visible');
    this.elements.accountsTable().should('be.visible');
    return this;
  }

  verifyAccountCount(expectedCount) {
    this.elements.accountRows().should('have.length', expectedCount);
    return this;
  }


}

export default new OverviewPage();