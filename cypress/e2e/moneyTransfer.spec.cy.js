import LoginPage from '../support/pages/LoginPage';

describe('Money transfer', () => {
	beforeEach(() => {
		LoginPage.visit().login('Alex', 'Testowe123').verifyLoginSuccess();
	});
	it('TC-022 Transferring money to the same account', () => {
		cy.contains('a', 'Transfer Funds').click();
		cy.get('#transferForm').should('be.visible');
		cy.get('#fromAccountId').select(0);
		cy.get('#toAccountId').select(0);
		cy.get('.button[value="Transfer"]').click();
		cy.get('.error').should('be.visible');
	});
	it('TC-023 Should transfer $200 and update balances correctly', () => {
		cy.contains('a', 'Accounts Overview').click();
		cy.get('#accountTable tbody tr')
			.eq(0)
			.find('td')
			.eq(0)
			.invoke('text')
			.then((firstAccount) => {
				cy.get('#accountTable tbody tr')
					.eq(1)
					.find('td')
					.eq(0)
					.invoke('text')
					.then((secondAccount) => {
						cy.contains('#accountTable tbody tr', firstAccount)
							.find('td')
							.eq(1)
							.invoke('text')
							.then((firstBeforeText) => {
								const firstBefore = parseFloat(
									firstBeforeText.replace(/[$,]/g, ''),
								);
								cy.contains('#accountTable tbody tr', secondAccount)
									.find('td')
									.eq(1)
									.invoke('text')
									.then((secondBeforeText) => {
										const secondBefore = parseFloat(
											secondBeforeText.replace(/[$,]/g, ''),
										);
										cy.contains('a', 'Transfer Funds').click();
										cy.get('#fromAccountId').select(firstAccount);
										cy.get('#toAccountId').select(secondAccount);
										cy.get('#amount').clear().type('200');
										cy.get('.button[value="Transfer"]').click();
										cy.contains('Transfer Complete!').should('be.visible');
										cy.contains('a', 'Accounts Overview').click();
										cy.contains('#accountTable tbody tr', firstAccount)
											.find('td')
											.eq(1)
											.invoke('text')
											.then((firstAfterText) => {
												const firstAfter = parseFloat(
													firstAfterText.replace(/[$,]/g, ''),
												);
												expect(firstAfter).to.equal(firstBefore - 200);
											});
										cy.contains('#accountTable tbody tr', secondAccount)
											.find('td')
											.eq(1)
											.invoke('text')
											.then((secondAfterText) => {
												const secondAfter = parseFloat(
													secondAfterText.replace(/[$,]/g, ''),
												);
												expect(secondAfter).to.equal(secondBefore + 200);
											});
									});
							});
					});
			});
	});
	it('TC-024 BUG! Should NOT allow transferring $0', () => {
		cy.contains('a', 'Transfer Funds').click();
		cy.get('#fromAccountId').select(0);
		cy.get('#toAccountId').select(1);
		cy.get('#amount').clear().type('0');
		cy.get('.button[value="Transfer"]').click();
		cy.get('.error').should('be.visible');
	});
});
