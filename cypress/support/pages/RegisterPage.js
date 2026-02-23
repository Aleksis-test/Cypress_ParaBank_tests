class RegisterPage {
    elements ={
        inputFirstName:() => cy.get('[name="customer.firstName"]'),
        inputLastName:() => cy.get('[name="customer.lastName"]'),
        inputAddress:() => cy.get('[name="customer.address.street"]'),
        inputCity:() => cy.get('[name="customer.address.city"]'),
        inputState:() => cy.get('[name="customer.address.state"]'),
        inputZpiCode:() => cy.get('[name="customer.address.zipCode"]'),
        inputPhone:() => cy.get('[name="customer.phoneNumber"]'),
        inputSSN:() => cy.get('[name="customer.ssn"]'),
        inputUserName:() => cy.get('[name="customer.username"]'),
        inputPassword:() => cy.get('[name="customer.password"]'),
        inputConfirmPassword:() => cy.get('[name="repeatedPassword"]'),
        registerBtn: () => cy.get('[value="Register"]'),
        errorMessages: () => cy.get('.error')
       

    }

visit(){
    cy.visit("https://parabank.parasoft.com/parabank/register.htm")
}
    clickRegister() {
    this.elements.registerBtn().click();
    return this;
  }
  fillRegistrationForm(firstName,lastName,address,city,state,zipCode,phone,ssn,userName,password,confirmPassword) {
this.elements.inputFirstName().clear().type(firstName)
this.elements.inputLastName().clear().type(lastName)
this.elements.inputAddress().clear().type(address)
this.elements.inputCity().clear().type(city)
this.elements.inputState().clear().type(state)
this.elements.inputZpiCode().clear().type(zipCode)
this.elements.inputPhone().clear().type(phone)
this.elements.inputSSN().clear().type(ssn)
this.elements.inputUserName().clear().type(userName)
this.elements.inputPassword().clear().type(password)
this.elements.inputConfirmPassword().clear().type(confirmPassword)
    return this;
}
 verifySuccessMessage() {
    cy.contains('Your account was created successfully').should('be.visible');
    return this;
  }
    verifyErrorMessage(expectedText) {
    this.elements.errorMessages().should('contain', expectedText);
    return this;
  }
    verifyErrorCount(minCount) {
    this.elements.errorMessages().should('have.length.at.least', minCount);
    return this;
  }
}
export default new RegisterPage();