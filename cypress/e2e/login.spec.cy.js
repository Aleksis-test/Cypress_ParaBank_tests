describe('Login correct data', () => {
	it('TC-005 Correct login', () => {
		cy.login('Alex', 'Testowe123');
		cy.url().should('include', 'overview');
		cy.contains('Accounts Overview').should('be.visible');
		cy.get('#accountTable').should('be.visible');
	});
});

describe('Login wrong data', () => {
	beforeEach(() => {
		cy.visit('https://parabank.parasoft.com/parabank/register.htm');
	});

	it('TC-006 Wrong username', () => {
		cy.get('[name="username"]').type('nieistnieje55555555');
		cy.get('[name="password"]').type('Testowe123');
		cy.get('[value="Log In"]').click();
		cy.get('.error').should('be.visible');
	});

	it('TC-007 Wrong password', () => {
		cy.get('[name="username"]').type('Alexisis');
		cy.get('[name="password"]').type('zlehaslo');
		cy.get('[value="Log In"]').click();
		cy.get('.error').should('be.visible');
	});
	it('TC-008 Empty fields', () => {
		cy.get('[value="Log In"]').click();
		cy.get('.error').should('be.visible');
		cy.get('.error').should('contain', 'Please enter a username and password');
	});
	it('TC-009 Empty password - Corret username', () => {
		cy.get('[name="username"]').type('Alexisis');
		cy.get('[value="Log In"]').click();

		cy.get('.error').should('be.visible');
		cy.get('.error').should('contain', 'Please enter a username and password.');
	});
	it('TC-010 Empty username - Corret password', () => {
		cy.get('[name="password"]').type('jakieshaslo');
		cy.get('[value="Log In"]').click();

		cy.get('.error').should('be.visible');
		cy.get('.error').should('contain', 'Please enter a username');
	});
	it('TC-011 Re-logging in after entering incorrect data', () => {
		cy.get('[name="username"]').type('złyużytkownik');
		cy.get('[value="Log In"]').click();
		cy.get('.error').should('be.visible');

		cy.get('[name="username"]').clear().type('Alex');
		cy.get('[name="password"]').clear().type('Testowe123');
		cy.get('[value="Log In"]').click();
		cy.url().should('include', 'overview');
	});
	it('TC-012 Logout', () => {
		cy.login('Alex', 'Testowe123');
		cy.url().should('include', 'overview');
		cy.contains('a', 'Log Out').click();
		cy.get('[value="Log In"]').should('be.visible');
	});
});
