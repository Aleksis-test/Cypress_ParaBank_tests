import RegisterPage from '../support/pages/RegisterPage';

describe('Register new user in ParaBank', () => {
	beforeEach(() => {
		RegisterPage.visit();
	});
	const randomNum = Math.floor(Math.random() * 10000);
	it('TC-001 Correct registration data', () => {
		RegisterPage.fillRegistrationForm(
			'Jan',
			'Kowalski',
			'Testowa 1',
			'Warszawa',
			'Mazowieckie',
			'00-001',
			'123-456-789',
			'123-45-6789',
			`testuser${randomNum}`,
			'Test123!',
			'Test123!',
		);

		RegisterPage.clickRegister().verifySuccessMessage();
	});
	it('TC-002 Empty fields', () => {
		RegisterPage.clickRegister().verifyErrorCount(5);
	});
	it('TC-003 Different password', () => {
		RegisterPage.fillRegistrationForm(
			'Jan',
			'Kowalski',
			'Testowa 1',
			'Warszawa',
			'Mazowieckie',
			'00-001',
			'123-456-789',
			'123-45-6789',
			`testuser${randomNum}`,
			'Test123!',
			'Test123456!',
		)
			.clickRegister()
			.verifyErrorMessage('Passwords did not match');
	});
	it('TC-004 Existing user', () => {
		RegisterPage.fillRegistrationForm(
			'Jan',
			'Kowalski',
			'Testowa 1',
			'Warszawa',
			'Mazowieckie',
			'00-001',
			'123-456-789',
			'123-45-6789',
			'Alex',
			'Testowe123',
			'Testowe123',
		)
			.clickRegister()
			.verifyErrorMessage('This username already exists');
	});
});
