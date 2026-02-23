import LoginPage from '../support/pages/LoginPage';
import OverviewPage from '../support/pages/OverviewPage';

describe('New Accouns in bank', () => {
	beforeEach(() => {
		LoginPage.visit().login('Alex', 'Testowe123').verifyLoginSuccess();
	});
	it('TC-022 Should create a new account and display it in accounts list', () => {
		cy.contains('a', 'Open New Account').click();
		cy.get('#fromAccountId').select(0);
		cy.get('[value="Open New Account"]').click();
		cy.get('#newAccountId').invoke('text').as('newAccountId');
		cy.contains('a', 'Accounts Overview').click();
		OverviewPage.verifyPageLoaded();
		cy.get('@newAccountId').then((newAccountId) => {
			cy.get('#accountTable').should('contain', newAccountId);
		});
	});
	it('TC-023 Should open account using specific account as source', () => {
		cy.contains('a', 'Open New Account').click();
		cy.get('#fromAccountId').select(1);
		cy.get('[value="Open New Account"]').click();
		cy.get('#newAccountId').should('be.visible');
	});
	it('TC-024 Should verify source account balance decreased by 100 after opening new account', () => {
		cy.contains('a', 'Accounts Overview').click();

		cy.get('#accountTable tbody tr')
			.first()
			.find('td')
			.first()
			.invoke('text')
			.as('sourceAccountNumber');

		cy.get('#accountTable tbody tr')
			.first()
			.find('td')
			.eq(1)
			.invoke('text')
			.then((oldBalanceText) => {
				const oldBalance = parseFloat(oldBalanceText.replace(/[$,]/g, ''));

				cy.contains('a', 'Open New Account').click();
				cy.get('#fromAccountId').select(0);
				cy.get('[value="Open New Account"]').click();
				cy.get('#newAccountId').should('be.visible');

				cy.contains('a', 'Accounts Overview').click();

				cy.get('@sourceAccountNumber').then((accountNumber) => {
					cy.contains('#accountTable tbody tr', accountNumber)
						.find('td')
						.eq(1)
						.invoke('text')
						.then((newBalanceText) => {
							const newBalance = parseFloat(
								newBalanceText.replace(/[$,]/g, ''),
							);

							expect(newBalance).to.equal(oldBalance - 100);

							cy.log(`Before: ${oldBalance}`);
							cy.log(`After: ${newBalance}`);
							cy.log(`Difference: ${oldBalance - newBalance}`);
						});
				});
			});
	});
});
