import LoginPage from '../support/pages/LoginPage';

describe('Bill Pay', () => {
	beforeEach(() => {
		LoginPage.visit().login('Alex', 'Testowe123').verifyLoginSuccess();
	});
	it('TC-025 Should add new payee with valid data', () => {
		cy.contains('a', 'Bill Pay').click();

		cy.get('[name="payee.name"]').type('Inpost');
		cy.get('[name="payee.address.street"]').type('Testowa 1');
		cy.get('[name="payee.address.city"]').type('Warszawa');
		cy.get('[name="payee.address.state"]').type('Mazowieckie');
		cy.get('[name="payee.address.zipCode"]').type('00-001');
		cy.get('[name="payee.phoneNumber"]').type('123456789');
		cy.get('[name="payee.accountNumber"]').type('123456789');
		cy.get('[name="verifyAccount"]').type('123456789');
		cy.get('[name="amount"]').type('100');

		cy.get('[name="fromAccountId"]').select(0);

		cy.get('[value="Send Payment"]').click();

		cy.contains('Bill Payment Complete').should('be.visible');
	});
	it('TC-026 Should validate required fields', () => {
		cy.contains('a', 'Bill Pay').click();

		cy.get('[value="Send Payment"]').click();

		cy.get('.error').should('have.length.at.least', 1);
	});

	it('TC-027 Should validate account number format', () => {
		cy.contains('a', 'Bill Pay').click();

		cy.get('[name="payee.name"]').type('Inpost');
		cy.get('[name="payee.accountNumber"]').type('abc');

		cy.get('[value="Send Payment"]').click();

		cy.contains('Please enter a valid number.').should('be.visible');
	});

	it('TC-028 BUG! Should NOT allow payment of $0', () => {
		cy.contains('a', 'Bill Pay').click();

		cy.get('[name="payee.name"]').type('Inpost');
		cy.get('[name="payee.address.street"]').type('Testowa 1');
		cy.get('[name="payee.address.city"]').type('Warszawa');
		cy.get('[name="payee.address.state"]').type('Mazowieckie');
		cy.get('[name="payee.address.zipCode"]').type('00-001');
		cy.get('[name="payee.phoneNumber"]').type('123456789');
		cy.get('[name="payee.accountNumber"]').type('123456789');
		cy.get('[name="verifyAccount"]').type('123456789');
		cy.get('[name="amount"]').type('0');
		cy.get('[name="fromAccountId"]').select(0);
		cy.get('[value="Send Payment"]').click();
		cy.get('.error').should('be.visible');
	});
});
