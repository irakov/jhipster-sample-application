import { element, by, ElementFinder } from 'protractor';

export class JobHistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-job-history div table .btn-danger'));
    title = element.all(by.css('jhi-job-history div h2#page-heading span')).first();

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

export class JobHistoryUpdatePage {
    pageTitle = element(by.id('jhi-job-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    startDateInput = element(by.id('field_startDate'));
    endDateInput = element(by.id('field_endDate'));
    languageSelect = element(by.id('field_language'));
    jobSelect = element(by.id('field_job'));
    departmentSelect = element(by.id('field_department'));
    employeeSelect = element(by.id('field_employee'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setStartDateInput(startDate) {
        await this.startDateInput.sendKeys(startDate);
    }

    async getStartDateInput() {
        return this.startDateInput.getAttribute('value');
    }

    async setEndDateInput(endDate) {
        await this.endDateInput.sendKeys(endDate);
    }

    async getEndDateInput() {
        return this.endDateInput.getAttribute('value');
    }

    async setLanguageSelect(language) {
        await this.languageSelect.sendKeys(language);
    }

    async getLanguageSelect() {
        return this.languageSelect.element(by.css('option:checked')).getText();
    }

    async languageSelectLastOption() {
        await this.languageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async jobSelectLastOption() {
        await this.jobSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async jobSelectOption(option) {
        await this.jobSelect.sendKeys(option);
    }

    getJobSelect(): ElementFinder {
        return this.jobSelect;
    }

    async getJobSelectedOption() {
        return this.jobSelect.element(by.css('option:checked')).getText();
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

    async employeeSelectLastOption() {
        await this.employeeSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async employeeSelectOption(option) {
        await this.employeeSelect.sendKeys(option);
    }

    getEmployeeSelect(): ElementFinder {
        return this.employeeSelect;
    }

    async getEmployeeSelectedOption() {
        return this.employeeSelect.element(by.css('option:checked')).getText();
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

export class JobHistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-jobHistory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-jobHistory'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
