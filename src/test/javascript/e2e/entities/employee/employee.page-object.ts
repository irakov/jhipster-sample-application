import { element, by, ElementFinder } from 'protractor';

export class EmployeeComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-employee div table .btn-danger'));
    title = element.all(by.css('jhi-employee div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class EmployeeUpdatePage {
    pageTitle = element(by.id('jhi-employee-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    firstNameInput = element(by.id('field_firstName'));
    lastNameInput = element(by.id('field_lastName'));
    emailInput = element(by.id('field_email'));
    phoneNumberInput = element(by.id('field_phoneNumber'));
    hireDateInput = element(by.id('field_hireDate'));
    salaryInput = element(by.id('field_salary'));
    commissionPctInput = element(by.id('field_commissionPct'));
    departmentSelect = element(by.id('field_department'));
    managerSelect = element(by.id('field_manager'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setFirstNameInput(firstName) {
        await this.firstNameInput.sendKeys(firstName);
    }

    async getFirstNameInput() {
        return this.firstNameInput.getAttribute('value');
    }

    async setLastNameInput(lastName) {
        await this.lastNameInput.sendKeys(lastName);
    }

    async getLastNameInput() {
        return this.lastNameInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async setPhoneNumberInput(phoneNumber) {
        await this.phoneNumberInput.sendKeys(phoneNumber);
    }

    async getPhoneNumberInput() {
        return this.phoneNumberInput.getAttribute('value');
    }

    async setHireDateInput(hireDate) {
        await this.hireDateInput.sendKeys(hireDate);
    }

    async getHireDateInput() {
        return this.hireDateInput.getAttribute('value');
    }

    async setSalaryInput(salary) {
        await this.salaryInput.sendKeys(salary);
    }

    async getSalaryInput() {
        return this.salaryInput.getAttribute('value');
    }

    async setCommissionPctInput(commissionPct) {
        await this.commissionPctInput.sendKeys(commissionPct);
    }

    async getCommissionPctInput() {
        return this.commissionPctInput.getAttribute('value');
    }

    async departmentSelectLastOption() {
        await this.departmentSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async departmentSelectOption(option) {
        await this.departmentSelect.sendKeys(option);
    }

    getDepartmentSelect(): ElementFinder {
        return this.departmentSelect;
    }

    async getDepartmentSelectedOption() {
        return this.departmentSelect.element(by.css('option:checked')).getText();
    }

    async managerSelectLastOption() {
        await this.managerSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async managerSelectOption(option) {
        await this.managerSelect.sendKeys(option);
    }

    getManagerSelect(): ElementFinder {
        return this.managerSelect;
    }

    async getManagerSelectedOption() {
        return this.managerSelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class EmployeeDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-employee-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-employee'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
