class LoginPage {
	elements = {
		usernameInput: () => cy.get('[name="username"]'),
		passwordInput: () => cy.get('[name="password"]'),
		loginButton: () => cy.get('[value="Log In"]'),
		errorMessage: () => cy.get('.error'),
	};

	visit() {
		cy.visit('https://parabank.parasoft.com/parabank/register.htm');
		return this;
	}

	typeUsername(username) {
		this.elements.usernameInput().clear().type(username);
		return this;
	}

	typePassword(password) {
		this.elements.passwordInput().clear().type(password);
		return this;
	}

	clickLogin() {
		this.elements.loginButton().click();
		return this;
	}

	login(username, password) {
		this.typeUsername(username).typePassword(password).clickLogin();
		return this;
	}

	verifyLoginSuccess() {
		cy.url().should('include', 'overview');
		cy.contains('Accounts Overview').should('be.visible');
		return this;
	}
}

export default new LoginPage();
