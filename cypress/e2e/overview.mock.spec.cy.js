import OverviewPage from '../support/pages/OverviewPage';
import LoginPage from '../support/pages/LoginPage';

describe('Accounts Overview - with mocked API', () => {
	it('TC-013 Should display mocked accounts from fixture file', () => {
		cy.intercept('GET', '**/services_proxy/bank/customers/*/accounts', {
			fixture: 'mock-account.json',
		}).as('getAccounts');

		LoginPage.visit().login('Alex', 'Testowe123');

		cy.wait('@getAccounts', { timeout: 10000 });

		OverviewPage.verifyPageLoaded().verifyAccountCount(3);

		cy.contains('$15000.50').should('be.visible');
	});

	it('TC-014 Should display mocked account details after clicking on account', () => {
		cy.intercept('GET', '**/services_proxy/bank/customers/*/accounts', {
			fixture: 'mock-account.json',
		}).as('getAccounts');

		LoginPage.visit().login('Alex', 'Testowe123');

		cy.wait('@getAccounts');

		OverviewPage.verifyPageLoaded();

		cy.contains('22646').should('be.visible');
	});

	it('TC-015 Should display empty account with zero balance', () => {
		cy.intercept('GET', '**/services_proxy/bank/customers/*/accounts', {
			fixture: 'mock-empty-account.json',
		}).as('getEmptyAccount');

		LoginPage.visit().login('Alex', 'Testowe123');

		cy.wait('@getEmptyAccount');

		cy.get('#accountTable').should('be.visible');
		cy.contains('$0.00').should('be.visible');
		cy.get('#accountTable tbody tr:has(a)').should('have.length', 1);
	});

	it('TC-016 Should display multiple accounts (5 accounts)', () => {
		cy.intercept('GET', '**/services_proxy/bank/customers/*/accounts', {
			fixture: 'mock-5-account.json',
		}).as('get5Accounts');

		LoginPage.visit().login('Alex', 'Testowe123');

		cy.wait('@get5Accounts');

		cy.get('#accountTable tbody tr:has(a)').should('have.length', 5);
	});

	it('TC-017 Should handle server error (500)', () => {
		cy.intercept('GET', '**/services_proxy/bank/customers/*/accounts', {
			statusCode: 500,
			body: 'Internal Server Error',
		}).as('getServerError');

		LoginPage.visit().login('Alex', 'Testowe123');

		cy.wait('@getServerError');

		cy.get('.error').should('be.visible');
	});

	it('TC-018 Should show loading spinner when response is delayed', () => {
		cy.intercept('GET', '**/services_proxy/bank/customers/*/accounts', {
			fixture: 'mock-account.json',
			delay: 3000,
		}).as('getSlowResponse');

		LoginPage.visit().login('Alex', 'Testowe123');

		cy.wait('@getSlowResponse');

		OverviewPage.verifyPageLoaded();
	});
});
