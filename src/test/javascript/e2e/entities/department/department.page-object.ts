import { element, by, ElementFinder } from 'protractor';

export class DepartmentComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-department div table .btn-danger'));
    title = element.all(by.css('jhi-department div h2#page-heading span')).first();

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

export class DepartmentUpdatePage {
    pageTitle = element(by.id('jhi-department-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    departmentNameInput = element(by.id('field_departmentName'));
    locationSelect = element(by.id('field_location'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDepartmentNameInput(departmentName) {
        await this.departmentNameInput.sendKeys(departmentName);
    }

    async getDepartmentNameInput() {
        return this.departmentNameInput.getAttribute('value');
    }

    async locationSelectLastOption() {
        await this.locationSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async locationSelectOption(option) {
        await this.locationSelect.sendKeys(option);
    }

    getLocationSelect(): ElementFinder {
        return this.locationSelect;
    }

    async getLocationSelectedOption() {
        return this.locationSelect.element(by.css('option:checked')).getText();
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

export class DepartmentDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-department-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-department'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
